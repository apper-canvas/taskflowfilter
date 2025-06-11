import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ConfettiExplosion = ({ position }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#5B4FE5', '#FF6B6B', '#4ECDC4', '#FFD93D', '#8B85F0'];
    const newPieces = [];

    for (let i = 0; i < 15; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      });
    }

    setPieces(newPieces);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: piece.color, width: piece.size, height: piece.size }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            x: piece.x,
            y: piece.y,
            scale: [0, 1, 0],
            rotate: piece.rotation
          }}
          transition={{
            duration: 1.5,
            delay: piece.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiExplosion;