<?php

class TicTac
{
    public static $lines = [
        [0, 1, 2],  // horizontals
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],  // verticals
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],  // 'diagonals'
        [2, 4, 6]
    ];
    protected $items = ['', '', '', '', '', '', '', '', ''];
    protected $mark = 'o';
    private $resultX = false;
    private $resultO = false;
    private $usedCells = 0;

    public function __construct(array $input = [], string $mark = 'o')
    {
        if (!empty($input)) {
            $this->items = array_replace($this->items, $input);
        }
        if (!empty($mark)) {
            $this->mark = $mark;
        }
        $this->checkWinner();
    }

    public function AI(): void
    {
        if ($this->resultX || $this->resultO || $this->usedCells === count($this->items)) {
            return;
        }

        $freeCells = array_filter($this->items, function($val){
            return empty($val);
        });

        $randomItem = array_rand($freeCells, 1);
        $this->items[$randomItem] = $this->mark;
        $this->checkWinner();
    }

    public function result(): array
    {
        $winner = false;
        if ($this->resultX) {
            $winner = '"X" winn!';
        }
        if ($this->resultO) {
            $winner = '"O" winn!';
        }
        if ($this->usedCells === count($this->items)) {
            $winner = '"DRAW"';
        }
        return [
            'items' => $this->items,
            'winner' => $winner
        ];
    }

    private function checkWinner(): void
    {
        foreach (self::$lines as $line) {
            if ($this->calculate($line, 'x')) {
                $this->resultX = true;
            }
            if ($this->calculate($line, 'o')) {
                $this->resultO = true;
            }
        }
        $this->usedCells = count(array_filter($this->items, function($val){
            return (!empty($val));
        }));
    }

    private function calculate(array $line, string $mark): bool
    {
        $result = 0;
        foreach ($line as $cell) {
            if ($this->items[$cell] === $mark) {
                $result += 1;
            }
        }
        return ($result === count($line));
    }
}
