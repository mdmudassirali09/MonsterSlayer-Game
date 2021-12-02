function randomHP(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            monsterHP: 100,
            playerHP: 100,
            round: 0,
            result: null,
            log: [],
            sp: false
        }
    },
    watch: { 
        playerHP(value) {
            if (value == 0 && this.monsterHP == 0)
                this.result = 'Its a Draw';
            else if (value == 0)
                this.result = 'You Lost !!';
        },
        monsterHP(value) {
            if (value == 0 && this.playerHP == 0)
                this.result = 'Its a Draw';
            else if (value == 0)
                this.result = 'You Won !!';
        }
    },
    computed: {
        playerHPBar() {
            return { width: this.playerHP + '%' };
        },
        monsterHPBar() {
            return { width: this.monsterHP + '%' };
        },
        spActive() {
            if (this.round != 0 && this.round % 4 == 0) {
                this.sp = true
                return false;
            }
            else {
                if (this.sp)
                    return false;
                else
                    return true;
            }
        },
    },
    methods: {
        playerAttack() {
            this.round++;
            const hp = randomHP(8, 1);
            if (this.monsterHP - hp < 0)
                this.monsterHP = 0;
            else
                this.monsterHP -= hp;
            this.log.push("You attacked -" + hp);
            this.monsterAttach();
        },
        monsterAttach() {
            const hp = randomHP(12, 8);
            if (this.playerHP + hp < 0)
                this.playerHP = 0;
            else
                this.playerHP -= hp;
            this.log.push("Monster Attacked attacked -" + hp);
        },
        specialAttack() {
            this.round++;
            this.sp = false;
            const hp = randomHP(20, 10);
            if (this.monsterHP - hp < 0)
                this.monsterHP = 0;
            else
                this.monsterHP -= hp;
            this.log.push("Used special attack -" + hp);
            this.monsterAttach();
        },
        heal() {
            this.round++;
            const hp = randomHP(20, 10);
            if (this.playerHP + hp > 100)
                this.playerHP;
            else
                this.playerHP += randomHP(20, 10);
            this.log.push("HP recovered +" + hp);
            this.monsterAttach();
        },
        surrender() {
            this.playerHP = 0;
            this.log.push("You surrendered, Be a man !!");
        },
        restart() {
            this.playerHP = 100;
            this.monsterHP = 100;
            this.result = null;
            this.log = [];
            this.round = 0;
            this.sp = false;
        }
    }
})

app.mount('#game');
