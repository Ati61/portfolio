import React, { useRef, useState, useEffect } from 'react';

// Japanese characters (katakana, hiragana, and some kanji for a tech feeling)
const japaneseChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン零一二三四五六七八九システム実行開始接続エラーデータプログラミング技術開発未来';

export default function HeroCanvas() {
  const [columns, setColumns] = useState<number[]>([]);
  const [chars, setChars] = useState<string[][]>([]);
  const [speeds, setSpeeds] = useState<number[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const fontSize = 16; // Slightly larger for better readability
  const charArray = japaneseChars.split('');

  // Initialize matrix columns
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fill parent container
    const resizeCanvas = () => {
      if (!canvasRef.current || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      
      // Calculate number of columns based on canvas width and font size
      // Using a larger gap for a sparser, more subtle effect
      const columnCount = Math.floor(canvas.width / (fontSize * 2.5)); // Increased spacing between columns
      const newColumns = Array.from({ length: columnCount }, (_, i) => i);
      
      // Create random starting positions
      const newPositions = Array(columnCount).fill(0).map(() => 
        Math.floor(Math.random() * canvas.height / fontSize)
      );
      
      // Create random speeds - SLOWER for less eye strain
      const newSpeeds = Array(columnCount).fill(0).map(() => 
        Math.random() * 0.15 + 0.05 // Much slower speeds (0.05-0.2 instead of 0.2-0.5)
      );
      
      // Create initial characters for each column
      const newChars = Array(columnCount).fill(0).map(() => 
        Array(Math.ceil(canvas.height / fontSize) + 10).fill(0).map(() => 
          charArray[Math.floor(Math.random() * charArray.length)]
        )
      );
      
      setColumns(newColumns);
      setPositions(newPositions);
      setSpeeds(newSpeeds);
      setChars(newChars);
    };

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || columns.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const fps = 10; // Lower FPS for slower animation (was 15)
    const interval = 1000 / fps;
    
    const draw = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;
        
        // Fade out previous frame more slowly for a trail effect
        ctx.fillStyle = 'rgba(15, 15, 15, 0.05)'; // Slower fade (0.05 instead of 0.1)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw characters
        columns.forEach((_, i) => {
          const x = i * (fontSize * 2.5); // Space out columns more
          const speedFactor = speeds[i];
          const pos = Math.floor(positions[i]);
          const columnChars = chars[i];
          
          // First character is brighter (head of the falling sequence)
          ctx.fillStyle = 'rgba(58, 69, 232, 0.5)'; // Using standardized accent color
          ctx.font = `${fontSize}px 'Noto Sans JP', 'JetBrains Mono', monospace`;
          const headChar = columnChars[pos % columnChars.length];
          ctx.fillText(headChar, x, pos * fontSize);
          
          // Following characters fade out - fewer for subtlety
          for (let j = 1; j < 6; j++) { 
            const opacity = (6 - j) / 15; // Lower opacity for trails
            ctx.fillStyle = `rgba(58, 69, 232, ${opacity * 0.4})`; // Using standardized accent color
            ctx.font = `${fontSize}px 'Noto Sans JP', 'JetBrains Mono', monospace`;
            const trailPos = pos - j;
            if (trailPos >= 0) {
              const trailChar = columnChars[(trailPos) % columnChars.length];
              ctx.fillText(trailChar, x, trailPos * fontSize);
            }
          }
          
          // Update position more slowly
          setPositions(prev => {
            const newPositions = [...prev];
            newPositions[i] = (newPositions[i] + speedFactor) % (canvas.height / fontSize + 20);
            return newPositions;
          });
          
          // Randomly change characters in the column less frequently
          if (Math.random() > 0.995) { // Even less frequent changes (0.995 instead of 0.99)
            setChars(prev => {
              const newChars = [...prev];
              const randomIndex = Math.floor(Math.random() * columnChars.length);
              newChars[i][randomIndex] = charArray[Math.floor(Math.random() * charArray.length)];
              return newChars;
            });
          }
        });
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [columns, chars, positions, speeds]);

  return (
    <div className="w-full h-full z-0"> {/* Lowered z-index */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}
