import { useEffect, useRef, useCallback } from 'react';
import PartySocket from 'partysocket';

interface Decoration {
    id: string;
    type: string;
    color: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
}

interface UseRealtimeSyncProps {
    roomCode: string;
    onDecorationsUpdate: (decorations: Decoration[]) => void;
}

export const useRealtimeSync = ({ roomCode, onDecorationsUpdate }: UseRealtimeSyncProps) => {
    const socketRef = useRef<PartySocket | null>(null);

    useEffect(() => {
        if (!roomCode) return;

        // Connect to a free public PartyKit server
        const socket = new PartySocket({
            host: 'christmas-tree.partykit.dev',
            room: roomCode,
        });

        socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'decorations') {
                    onDecorationsUpdate(data.decorations);
                }
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        });

        socket.addEventListener('open', () => {
            console.log('Connected to room:', roomCode);
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [roomCode, onDecorationsUpdate]);

    const sendDecoration = useCallback((decoration: Decoration) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: 'add-decoration',
                decoration,
            }));
        }
    }, []);

    const sendAllDecorations = useCallback((decorations: Decoration[]) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: 'sync-decorations',
                decorations,
            }));
        }
    }, []);

    return { sendDecoration, sendAllDecorations };
};
