const ONE_MINUTE = 60;
const THREE_MINUTES = ONE_MINUTE * 3;
const FOUR_MINUTES = ONE_MINUTE * 4;
const FIVE_MINUTES = ONE_MINUTE * 5;
const TEN_MINUTES = ONE_MINUTE * 10;
const FIFTEEN_MINUTES = ONE_MINUTE * 15
const THIRTY_MINUTES = ONE_MINUTE * 30

export default [
  {
    name: 'Comentários iniciais',
    timer: 0,
    limitTime: ONE_MINUTE,
  },
  {
    name: 'Tesouros',
    timer: 0,
    limitTime: TEN_MINUTES,
  },
  {
    name: 'Joias Espirituais',
    timer: 0,
    limitTime: TEN_MINUTES,
  },
  {
    name: 'Leitura da bíblia',
    timer: 0,
    limitTime: FOUR_MINUTES,
    advice:0
  },
  {
    name: 'Primeira parte',
    timer: 0,
    limitTime: THREE_MINUTES,
    advice:0
  },
  {
    name: 'Revisita',
    timer: 0,
    limitTime: FOUR_MINUTES,
    advice:0
  },
  {
    name: 'Estudo Bíblico',
    timer: 0,
    limitTime: FIVE_MINUTES,
    advice:0
  },
  {
    name: 'Nossa Vida Cristã',
    option1: {
      name: '',
      timer: 0,
      limitTime: FIFTEEN_MINUTES,
    },
    option2: [
      {
        name: '',
        timer: 0,
        limitTime: 0,
      },
      {
        name: '',
        timer: 0,
        limitTime: 0,
      }
    ],
  },
  {
    name: 'Estudo Bíblico de Congregação',
    timer: 0,
    limitTime: THIRTY_MINUTES,
    advice:0
  }
]