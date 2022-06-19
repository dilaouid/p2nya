const emojis = [
    {
        name: [':angel:', 'O:)', '(a)', '(A)'],
        img: './assets/img/emojis/angel.png'
    },
    {
        name: [':angry:', ':@', ':-@'],
        img: './assets/img/emojis/angry.png'
    },
    {
        name: [':blush:', ':$', ':-$'],
        img: './assets/img/emojis/blush.png'
    },
    {
        name: [':bored:', '|-)'],
        img: './assets/img/emojis/bored.png'
    },
    {
        name: [':confused:', '|-)'],
        img: './assets/img/emojis/confused.png'
    },
    {
        name: [':cry:', ":'(", ":'-("],
        img: './assets/img/emojis/cry.gif'
    },
    {
        name: [':devil:', "(6)"],
        img: './assets/img/emojis/devil.png'
    },
    {
        name: [':devil:', "(6)"],
        img: './assets/img/emojis/devil.png'
    },
    {
        name: [':eh:', ":|", ':-|'],
        img: './assets/img/emojis/eh.png'
    },
    {
        name: [':gr:', "8o|", '8o-|'],
        img: './assets/img/emojis/gr.png'
    },
    {
        name: [':hm:', "^o)", '^o-)'],
        img: './assets/img/emojis/hm.png'
    },
    {
        name: [':kiss:', "(k)", '(K)'],
        img: './assets/img/emojis/kiss.png'
    },
    {
        name: [':lol:', ":D", ':-D'],
        img: './assets/img/emojis/lol.png'
    },
    {
        name: [':nerd:', "8-|", '8|'],
        img: './assets/img/emojis/nerd.png'
    },
    {
        name: [':not_convinced:', '8)', '8-)'],
        img: './assets/img/emojis/not_convinced.png'
    },
    {
        name: [':omg:', ':o', ':O', ':-o', ':-O'],
        img: './assets/img/emojis/omg.png'
    },
    {
        name: [':party:', '<:o)'],
        img: './assets/img/emojis/party.gif'
    },
    {
        name: [':roll:', '*-)'],
        img: './assets/img/emojis/roll.png'
    },
    {
        name: [':sad:', ':(', ":-("],
        img: './assets/img/emojis/sad.png'
    },
    {
        name: [':sick:', '+o('],
        img: './assets/img/emojis/sick.png'
    },
    {
        name: [':smile:', ':)', ':-)'],
        img: './assets/img/emojis/smile.png'
    },
    {
        name: [':sunglasses:', '(h)', '(H)'],
        img: './assets/img/emojis/sunglasses.png'
    },
    {
        name: [':tongue:', ':P', ':-P', ':p', ':-p'],
        img: './assets/img/emojis/tongue.png'
    },
    {
        name: [':whisper:', ':-*', ':*'],
        img: './assets/img/emojis/whisper.png'
    },
    {
        name: [':wink:', ';)', ';-)'],
        img: './assets/img/emojis/wink.gif'
    },
    {
        name: [':zip:', ':-#', ':#'],
        img: './assets/img/emojis/zip.png'
    }
];

export const convertAliasToEmojis = (message: string): string => {
    emojis.map ( (el:any) => {
        for (let k in el.name) {
            if (message.includes(el.name[k]))
                message = message.replace(el.name[k], `<img src="${el.img}" class="emoji">`)
        }
    });
    return (message);
};