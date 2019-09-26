const app = new Vue({
    el: '#app',
    name: 'App',
    data: {
        gameModes: [
            { value: '1player',  label: 'One Player' },
            { value: '2players', label: 'Two Players' },
            { value: 'api',      label: 'Use PHP Api' }
        ],
        gameMode: 'api',
        currentMark: 'x',
        items: ['', '', '', '', '', '', '', '', '']
    },
    watch: {
        gameMode: 'init'
    },
    methods: {
        init() {
            const items = [];
            for (let i = 0; i < 9; i += 1) {
                items.push('');
            }
            this.$set(this, 'items', items);
            this.$set(this, 'currentMark', 'x');
        },
        clickBtn(index, isAI = false) {
            if (this.items[index] !== '') {
                return;
            }
            this.$set(this.items, index, this.currentMark);

            if (this.gameMode === 'api') {
                this.sendData();
                return;
            }

            this.updateCurrentMark();
            this.$nextTick(() => {
                this.checkWinner();
            });
            if (this.gameMode === '1player' && !isAI) {
                this.AI();
            }
        },
        updateCurrentMark() {
            const newValue = (this.currentMark === 'x') ? 'o' : 'x';
            this.$set(this, 'currentMark', newValue);
        },
        checkWinner() {
            let resultX = false;
            let resultO = false;
            const lines = [
                [0, 1, 2], // horizontals
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6], // verticals
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8], // diagonals
                [2, 4, 6]
            ];

            lines.forEach((line) => {
                const resX = line.every(it => (this.items[it] === 'x'));
                const resO = line.every(it => (this.items[it] === 'o'));
                if (resX) {
                    resultX = true;
                }
                if (resO) {
                    resultO = true;
                }
            });

            if (resultX) {
                alert('"X" winn!');
                this.init();
                return;
            }
            if (resultO) {
                alert('"O" winn!');
                this.init();
                return;
            }
            const count = this.items.reduce((acum, cur) => ((cur !== '') ? (acum + 1) : acum), 0);
            if (count === 9) {
                alert('"DRAW"');
                this.init();
                return;
            }
        },
        AI() {
            const freeCells = [];
            this.items.forEach((item, index) => {
                if (item === '') {
                    freeCells.push(index);
                }
            });
            const randomItem = freeCells[Math.floor(Math.random() * freeCells.length)];
            this.clickBtn(randomItem, true);
        },
        sendData() {
            fetch('./api.php', {
                method: 'POST',
                body: JSON.stringify(this.items),
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            })
                .then((response) => response.json())
                .then((json) => {
                    this.$set(this, 'items', json.items);
                    if (json.winner !== false) {
                        alert(json.winner);
                        this.init();
                    }
                    // console.log(json);
                })
                .catch((error) => console.error(error));
        }
    }
});
