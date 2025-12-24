import React, { useState, useEffect, useRef } from 'react';
import { TreePine, Users, Share2, Copy, Check, ArrowLeft } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  roomCode?: string;
  friendCount?: number;
  onBackToLanding?: () => void;
}

const Header: React.FC<HeaderProps> = ({ roomCode, friendCount = 0, onBackToLanding }) => {
  const [copied, setCopied] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?room=${roomCode}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied! 🎄",
        description: "Share it with friends to decorate together",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Couldn't copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Back button and Logo */}
        <div className="flex items-center gap-4">
          {onBackToLanding && (
            <Button
              onClick={onBackToLanding}
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-border/40 hover:border-primary/60 
                         hover:bg-primary/10 transition-all duration-300 px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline font-medium">Back</span>
            </Button>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/30 border-2 border-primary/40 glow-soft">
              <TreePine className="w-6 h-6 text-primary drop-shadow-lg" />
            </div>
            <span className="text-xl font-display font-bold text-foreground hidden sm:block drop-shadow-lg">
              Decorate Together
            </span>
          </div>
        </div>

        {/* Center - Room info */}
        {roomCode && (
          <div className="glass-premium rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Room:</span>
            <span className="font-mono text-base text-primary font-bold tracking-widest">
              {roomCode}
            </span>
            {friendCount > 0 && (
              <div className="flex items-center gap-2 text-secondary pl-2 border-l border-border/30">
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">{friendCount + 1}</span>
              </div>
            )}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {roomCode && (
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-primary/40 hover:bg-primary/20 
                         hover:border-primary/60 transition-all duration-300
                         shadow-md hover:shadow-lg px-5 py-2"
            >
              {copied ? (
                <Check className="w-4 h-4 text-secondary" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span className="ml-2 hidden sm:inline font-medium">
                {copied ? 'Copied!' : 'Share'}
              </span>
            </Button>
          )}

          <MusicPlayer />
        </div>
      </div>
    </header>
  );
};

export default Header;
