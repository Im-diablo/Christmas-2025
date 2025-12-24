import { useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';

interface Decoration {
    id: string;
    type: string;
    color: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
    placedId: string;
}

export const usePeerSync = (roomCode: string) => {
    const peerRef = useRef<Peer | null>(null);
    const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!roomCode) return;

        // Create a peer with a deterministic ID based on room code and random suffix
        const peerId = `christmas-${roomCode}-${Math.random().toString(36).substr(2, 9)}`;
        const peer = new Peer(peerId, {
            host: '0.peerjs.com',
            port: 443,
            path: '/',
            secure: true,
        });

        peer.on('open', (id) => {
            console.log('✅ Connected to PeerJS server with ID:', id);
            setIsConnected(true);

            // Try to connect to other peers in the same room
            // We'll use a simple discovery mechanism
            const roomPeerId = `christmas-${roomCode}-room`;

            // Try to connect to the room coordinator
            setTimeout(() => {
                const conn = peer.connect(roomPeerId);
                if (conn) {
                    setupConnection(conn);
                }
            }, 1000);
        });

        peer.on('connection', (conn) => {
            console.log('📥 Incoming connection from:', conn.peer);
            setupConnection(conn);
        });

        peer.on('error', (err) => {
            console.error('PeerJS error:', err);
        });

        const setupConnection = (conn: DataConnection) => {
            conn.on('open', () => {
                console.log('🔗 Connection established with:', conn.peer);
                connectionsRef.current.set(conn.peer, conn);

                // Send current decorations to the new peer
                conn.send({
                    type: 'sync',
                    decorations: decorations,
                });
            });

            conn.on('data', (data: any) => {
                if (data.type === 'decoration') {
                    setDecorations(prev => {
                        if (prev.some(d => d.placedId === data.decoration.placedId)) {
                            return prev;
                        }
                        return [...prev, data.decoration];
                    });
                } else if (data.type === 'sync') {
                    setDecorations(prev => {
                        const newDecorations = data.decorations.filter(
                            (newDec: Decoration) => !prev.some(d => d.placedId === newDec.placedId)
                        );
                        return [...prev, ...newDecorations];
                    });
                }
            });

            conn.on('close', () => {
                console.log('Connection closed with:', conn.peer);
                connectionsRef.current.delete(conn.peer);
            });
        };

        peerRef.current = peer;

        return () => {
            connectionsRef.current.forEach(conn => conn.close());
            peer.destroy();
        };
    }, [roomCode]);

    const broadcastDecoration = (decoration: Decoration) => {
        const message = {
            type: 'decoration',
            decoration,
        };

        connectionsRef.current.forEach(conn => {
            if (conn.open) {
                conn.send(message);
            }
        });

        setDecorations(prev => [...prev, decoration]);
    };

    return { decorations, broadcastDecoration, isConnected };
};
