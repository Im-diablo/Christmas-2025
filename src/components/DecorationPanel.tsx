import React, { useState } from 'react';
import { Sparkles, Gift, Star, CandyCane, Ribbon } from 'lucide-react';
import DecorationItem, { Decoration } from './DecorationItem';
import gsap from 'gsap';

interface DecorationPanelProps {
  onDragStart: (e: React.DragEvent, decoration: Decoration) => void;
}

type Category = 'baubles' | 'toppers' | 'candy' | 'ribbons' | 'gifts';

const DecorationPanel: React.FC<DecorationPanelProps> = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('baubles');

  const categories = [
    { id: 'baubles' as Category, icon: '🎄', label: 'Ornaments' },
    { id: 'toppers' as Category, icon: '⭐', label: 'Topper' },
    { id: 'candy' as Category, icon: '🍬', label: 'Candy' },
    { id: 'ribbons' as Category, icon: '🎀', label: 'Ribbons' },
    { id: 'gifts' as Category, icon: '🎁', label: 'Gifts' },
  ];

  const decorations: Record<Category, Decoration[]> = {
    baubles: [
      { id: 'bauble-red', type: 'bauble', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-gold', type: 'bauble', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-blue', type: 'bauble', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-silver', type: 'bauble', color: '#9E9E9E', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-green', type: 'bauble', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-purple', type: 'bauble', color: '#8E24AA', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-pink', type: 'bauble', color: '#EC407A', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-teal', type: 'bauble', color: '#26A69A', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    toppers: [
      { id: 'star-gold', type: 'star', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'star-silver', type: 'star', color: '#C0C0C0', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'star-red', type: 'star', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    candy: [
      { id: 'candy-red', type: 'candy', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'candy-green', type: 'candy', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'candy-blue', type: 'candy', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    ribbons: [
      { id: 'ribbon-red', type: 'ribbon', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'ribbon-gold', type: 'ribbon', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'ribbon-silver', type: 'ribbon', color: '#C0C0C0', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    gifts: [
      { id: 'gift-red', type: 'gift', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-blue', type: 'gift', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-green', type: 'gift', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-purple', type: 'gift', color: '#8E24AA', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <div className="glass-premium rounded-3xl p-6 w-80 max-h-[75vh] overflow-hidden flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/20 glow-soft">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Decorate the Tree</h2>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
              transition-all duration-300 transform
              ${activeCategory === cat.id
                ? 'bg-primary/30 text-primary border-2 border-primary/50 scale-105 shadow-lg glow-soft'
                : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 border-2 border-transparent hover:scale-105'
              }
            `}
          >
            <span className="text-base">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Decorations grid */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-4 gap-3">
          {decorations[activeCategory].map((decoration, index) => (
            <div
              key={decoration.id}
              className="aspect-square p-2 rounded-2xl bg-muted/40 hover:bg-muted/60 
                         transition-all duration-300 hover:scale-110 animate-fade-in
                         border border-border/20 hover:border-primary/30
                         shadow-md hover:shadow-xl cursor-grab active:cursor-grabbing"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <DecorationItem
                decoration={decoration}
                onDragStart={onDragStart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="mt-4 pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          ✨ Drag ornaments onto the tree
        </p>
      </div>
    </div>
  );
};

export default DecorationPanel;
