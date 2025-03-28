import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Japanese characters (katakana and some kanji)
const japaneseChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ 零一二三四五六七八九 システム エラー 警告 接続 切断';
const characters = japaneseChars.split(' ').join('').split('');

export default function CyberText() {
  const [text, setText] = useState<string[]>([]);
  const lines = 8;
  const charsPerLine = 35;
  const refreshRate = 80; // milliseconds

  useEffect(() => {
    // Initialize empty text grid
    const initialText: string[] = [];
    for (let i = 0; i < lines; i++) {
      let line = '';
      for (let j = 0; j < charsPerLine; j++) {
        line += ' ';
      }
      initialText.push(line);
    }
    setText(initialText);

    const interval = setInterval(() => {
      setText(prevText => {
        // Make a deep copy of the previous text
        const newText = [...prevText];
        
        // Random updates in the text
        for (let i = 0; i < lines; i++) {
          const newLine = newText[i].split('');
          
          for (let j = 0; j < charsPerLine; j++) {
            // 5% chance to update each character
            if (Math.random() < 0.05) {
              newLine[j] = characters[Math.floor(Math.random() * characters.length)];
            }
          }
          
          newText[i] = newLine.join('');
        }
        
        return newText;
      });
    }, refreshRate);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="absolute top-0 left-0 right-0 h-screen overflow-hidden font-mono text-sm z-0 opacity-10 select-none pointer-events-none" // Lowered z-index
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 1 }}
    >
      {text.map((line, index) => (
        <motion.div 
          key={index} 
          className="text-neon-blue whitespace-pre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
