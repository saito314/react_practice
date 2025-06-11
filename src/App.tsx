import React from 'react';
import { useState } from 'react';
import './App.css';
import { on } from 'events';


function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function calculateWinner(squares: Array<string | null>) {
  // 勝者を判定するための全ての組み合わせを定義
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}


function Board({ xIsNext, squares, onPlay }: {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
}) {

  // ブロックがクリックされたときの処理
  function handleClick(i: number) {

    if (squares[i] || calculateWinner(squares)) {
      // 勝者が決まっている場合や、すでにクリックされているブロックは無視する
      return;
    }

    // 新しい状態を作成して更新
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "O";
    } else {
      nextSquares[i] = "X";
    }
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'O' : 'X'}`;
  }

  // ゲームの状態を表示する
  // 勝者が決まった場合はそのプレイヤーを表示
  // 勝者が決まっていない場合は次のプレイヤーを表示
  return (
    <>
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  // 先手がデフォルトでXになるように設定
  const [xIsNext, setXIsNext] = useState(true);
  // 9つのブロックの状態を管理する
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 現在のブロックの状態を取得
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string | null>) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext); // 次のプレイヤーを切り替える
  }

  function jumpTo(nextMove: number) {

  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}