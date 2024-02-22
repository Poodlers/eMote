using backend.Common;
using backend.Models;

public class ModuloSeeder
{

    public static List<ModuloContent> SeedModulo()
    {
        var modulos = new List<ModuloContent>();

        var modulo1 = new ModuloContent
        {
            ModuleNumberOrder = 1,
            Title = "Psicoeducação",
            IntroText = @"Neste módulo 
                            iremos explicar a ingestão alimentar compulsiva, os mecanismos que a mantêm e o papel da regulação emocional para que possa entender melhor as suas dificuldades e sintomas.",
            SubModules = new List<SubModule>
            {

            new SubModule
            {
                SubModuleNumberOrder = 1,
                Title = "O que é a ingestão alimentar compulsiva?",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod1_ativ1.mp4",
                        }
                    }
            },
            new SubModule
            {
                SubModuleNumberOrder = 2,
                Title = "O que são comportamentos compensatórios inapropriados?",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod2_ativ1.mp4",
                        }
                    }

            },
            new SubModule
            {
                SubModuleNumberOrder = 3,
                Title = "O papel da restrição alimentar",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "new_vid.mp4",
                        }
                    }
            },
            new SubModule
            {
                SubModuleNumberOrder = 4,
                Title = "Regulação emocional e ingestão alimentar compulsiva",

                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod3_ativ1.mp4",
                        }
                    }
            },
            new SubModule
            {
                SubModuleNumberOrder = 5,
                Title = "A história da Ângela",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod4_ativ1.mp4",
                        },
                        new SubModulePage
                        {
                            PageNumber = 2,
                            Text = @"Aqui pode ver o modelo de regulação emocional para o episódio de ingestão alimentar compulsiva da Ângela.",

                            ImageFile = "submod4_ativ2.png",
                        },
                        new SubModulePage{
                            PageNumber = 3,
                            Text = @"string"

                        },
                        new SubModulePage
                        {
                            PageNumber = 4,
                            Text = @"Gostaríamos de lhe lançar um desafio! Convidamo-la a descarregar o modelo de regulação de emocional e a tirar uns minutos do seu tempo para fazer o seu próprio modelo recorrendo a um episódio recente que tenha tido",
                        OtherFile = "submod4_ativ3.pdf"

                        }


                        }
                    },
            new SubModule
            {
                SubModuleNumberOrder = 6,
                Title = "A teoria biossocial para a regulação emocional",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod5_ativ1.mp4",
                        }
            },
            },

            new SubModule
            {
                SubModuleNumberOrder = 7,
                Title = "O diário das refeições e o diário das emoções",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            VideoFile = "submod6_ativ1.mp4",
                        }
                    }
            },

            new SubModule
            {
                SubModuleNumberOrder = 8,
                Title = "Recapitulando...",
                SubModulePages =
                    new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            Text = @"A teoria biossocial sugere que a existência de uma vulnerabilidade biológica associada a um ambiente invalidante dá origem a dificuldades na regulação emocional. O modelo de regulação emocional e a história da Ângela mostram que recorrer à comida diminui, apenas temporariamente, o sofrimento emocional e que a longo prazo aumenta a culpa, a vergonha e o desespero, mantendo o ciclo negativo da ingestão alimentar compulsiva. Os módulos seguintes vão disponibilizar exercícios com o objetivo de a ajudar a quebrar este ciclo e a gerir melhor as suas emoções.",
                        }
                    }
            },
            }

        };

        var modulo2 = new ModuloContent
        {
            ModuleNumberOrder = 2,
            Title = "Mindfulness",
            IntroText = @"Mindfulness, 
                            ou atenção plena, 
                            é a capacidade de estar no momento presente sem julgamento. Esta capacidade permite-nos estar menos reativas ao que acontece a cada momento, seja essa experiência positiva, negativa ou neutra, diminuindo o sofrimento e aumentando a sensação de bem-estar.",
            SubModules = new List<SubModule>
            {
                new SubModule
                {
                    SubModuleNumberOrder = 1,
                    Title = "Mindfulness e ingestão alimentar compulsiva ",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            Text = @"Quando 
                            praticamos mindfulness somos capazes de nos 
                            aceitarmos tal como somos e de aceitarmos a situação em que nos encontramos. Esta é a base para gerirmos as nossas emoções sem recorrermos à comida."
                        },
                        new SubModulePage
                        {
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {

                                    ExercicioName = @"Respiração diafragmática",
                                    ExercicioFile = "submod2.1_ativ1.mp3",
                                    ModuloNumberOrder = 2,
                                    SubModuleNumberOrder = 1,
                                    PageNumber = 2


                                }
                            }
                        }

                    }
                },
                new SubModule
                {
                    SubModuleNumberOrder = 2,
                    Title = "Mente sábia",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage
                         {
                            PageNumber = 1,
                            Text = @"Existem três estados mentais 
                            que influenciam o nosso comportamento: a mente racional, 
                            a mente emocional e a mente sábia.\r\nMente Racional \r\nNa nossa mente racional,
                             os nossos comportamentos são controlados pela razão e pela lógica. Esta mente poderá 
                             ser muito benéfica, mas poderá também levar-nos a ignorar a influência das nossas emoções.
                             \r\nMente Emocional\r\nAs emoções são essenciais para vivermos uma vida rica e valorizada e 
                             para nos sentirmos motivadas. No entanto, quando os nossos comportamentos são decididos apenas 
                             pelo que estamos a sentir, podemos não os conseguir controlar.\r\nMente Sábia\r\nA mente sábia 
                             integra a mente racional e a mente emocional. Quando usamos a nossa mente sábia,
                              é o nosso melhor eu que assume o controlo. Aqui encontramo-nos conscientes das nossas emoções
                               e do nosso pensamento, mas não nos deixamos controlar por nenhum deles."
                         },
                         new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 2,
                                    SubModuleNumberOrder = 2,
                                    PageNumber = 2,
                                    ExercicioName = @"Encontre a sua mente sábia",
                                    ExercicioFile = "submod2.2_ativ1.mp3"
                                }
                            }
                         }
                    }

                },
                new SubModule{
                    SubModuleNumberOrder = 3,
                    Title = "Observar",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            Text = @"Observar ensina-nos a notar uma experiência/situação sem reagirmos ou ficarmos presos a essa mesma experiência. A ingestão compulsiva acontece quando estamos na nossa mente emocional e este exercício ajuda-nos a aceder à nossa mente sábia. "
                        },
                        new SubModulePage
                        {
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 2,
                                    SubModuleNumberOrder = 3,
                                    PageNumber = 2,
                                    ExercicioName = @"Observar",
                                    ExercicioFile = "submod2.3_ativ1.mp3"
                                }
                            }
                        }
                }
            },
            new SubModule{
                SubModuleNumberOrder = 4,
                Title = "Descrever",
                SubModulePages = new List<SubModulePage>
                    {
                    new SubModulePage
                    {
                        PageNumber = 1,
                        Text = @"Descrever implica que utilizemos as palavras para representar o que observamos. Os exercícios de observar e descrever são muito eficazes quando sentimos que a nossa mente emocional a ficar mais agitada e surge o impulso para comer compulsivamente."
                    },
                    new SubModulePage
                    {
                        PageNumber = 2,
                        Exercicios = new List<Exercicio>
                        {
                            new Exercicio
                            {
                                ModuloNumberOrder = 2,
                                SubModuleNumberOrder = 4,
                                PageNumber = 2,
                                ExercicioName = @"Observar e descrever com um tapete rolante",
                                ExercicioFile = "submod2.4_ativ1.mp3"
                            }
                        }
                        }
                    }
            },
        new SubModule{
            SubModuleNumberOrder = 5,
            Title = "Mindful eating",
            SubModulePages = new List<SubModulePage>
                {
                new SubModulePage
                {
                    PageNumber = 1,
                    Text = @"Mindful eating consiste em focarmos a nossa atenção no que estamos a comer. Este exercício permite-nos ouvir melhor o nosso corpo e perceber quando temos fome ou quando estamos saciadas. Aqui comemos com consciência a cada momento, a cada sabor, a cada textura. 

Para este exercício, convidamo-la a usar uma passa de uva."
                },
                new SubModulePage
                {
                    PageNumber = 2,
                    Exercicios = new List<Exercicio>
                    {
                        new Exercicio
                        {
                            ModuloNumberOrder = 2,
                            SubModuleNumberOrder = 5,
                            PageNumber = 2,
                            ExercicioName = "Meditação da passa de uva",
                            ExercicioFile = "submod2.5_ativ1.mp3"
                        }
                    }
                }
            }
        },

        new SubModule{
            SubModuleNumberOrder = 6,
            Title = "Não julgar",
             SubModulePages = new List<SubModulePage>
                {
                new SubModulePage
                {
                    PageNumber = 1,
                    Text = @"Aqui vamos explicar-lhe como praticar o não julgamento. Sugerimos que ouça atentamente a nossa explicação."
                },
                new SubModulePage
                {
                    PageNumber = 2,
                    Exercicios = new List<Exercicio>
                    {
                        new Exercicio
                        {
                            ModuloNumberOrder = 2,
                            SubModuleNumberOrder = 6,
                            PageNumber = 2,
                            ExercicioName = "Não julgar",
                            ExercicioFile = "submod2.6_ativ1.mp3"
                        }
                    }
                }
            }
        },
          new SubModule{
            SubModuleNumberOrder = 7,
            Title = "Focar numa coisa de cada vez",
             SubModulePages = new List<SubModulePage>
                {
                new SubModulePage
                {
                    PageNumber = 1,
                    Text = @"Com este exercício 
                    aprendemos a controlar a nossa atenção, permitindo que a mente esteja concentrada num momento de cada vez, quer seja a comer, a conduzir ou a pensar num problema."
                },
                new SubModulePage
                {
                    PageNumber = 2,
                    Exercicios = new List<Exercicio>
                    {
                        new Exercicio
                        {
                            ModuloNumberOrder = 2,
                            SubModuleNumberOrder = 7,
                            PageNumber = 2,
                            ExercicioName = "Focar num momento de cada vez",
                            ExercicioFile = "submod2.7_ativ1.mp3"
                        }
                    }
                }
            }
        },
        new SubModule{
            SubModuleNumberOrder = 8,
            Title = "Mindful eating em imaginação",
             SubModulePages = new List<SubModulePage>
                {
                new SubModulePage
                {
                    PageNumber = 1,
                    Text = @"Este exercício dá-nos a possibilidade de
                     praticar mindful eating em imaginação com uma 
                     comida “gatilho” associada aos episódios de ingestão compulsiva."
                },
                new SubModulePage
                {
                    PageNumber = 2,
                    Exercicios = new List<Exercicio>
                    {
                        new Exercicio
                        {
                            ModuloNumberOrder = 2,
                            SubModuleNumberOrder = 8,
                            PageNumber = 2,
                            ExercicioName = "Mindful eating em imaginação",
                            ExercicioFile = "submod2.8_ativ1.mp3"
                        }
                    }
                }
            }
        },
        new SubModule{
            SubModuleNumberOrder = 9,
            Title = "Surfar o impulso",
             SubModulePages = new List<SubModulePage>
                {
                new SubModulePage
                {
                    PageNumber = 1,
                    Text = @"Surfar o impulso implica visualizarmos os nossos impulsos para comer compulsivamente como se fossem uma onda no oceano e aprendermos a “surfá-los”. Quando observamos os impulsos como se fossem uma onda não os intensificamos e percebemos que diminuem com o tempo.
Para fazer o exercício, sugerimos que use um alimento que considera tentador."
                },
                new SubModulePage
                {
                    PageNumber = 2,
                    Exercicios = new List<Exercicio>
                    {
                        new Exercicio
                        {
                            ModuloNumberOrder = 2,
                            SubModuleNumberOrder = 9,
                            PageNumber = 2,
                            ExercicioName = "Surfar o Impulso",
                            ExercicioFile = "submod2.9_ativ1.mp3"
                        }
                    }
                }
            }
        },




    }
        };

        var modulo3 = new ModuloContent
        {
            ModuleNumberOrder = 3,
            Title = "Regulação Emocional",
            IntroText = @"Este módulo ajuda-nos a lidar habilmente com as nossas emoções. As emoções dolorosas e difíceis fazem parte da vida e não podem ser totalmente evitadas, mas podemos mudar a forma como nos relacionamos com o sofrimento emocional.",
            SubModules = new List<SubModule>
            {

                new SubModule{
                    SubModuleNumberOrder = 1,
                    Title = "Mindfulness da emoção presente",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            Text = @"As emoções dolorosas fazem parte da condição humana e todos temos de as enfrentar por mais que as tentemos não sentir ou controlar. A aceitação das nossas emoções permite-nos deixar ir/largar o sofrimento emocional sem o aumentarmos."
                        },
                        new SubModulePage
                        {
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 3,
                                    SubModuleNumberOrder = 1,
                                    PageNumber = 2,
                                    ExercicioName = "Mindfulness da emoção presente",
                                    ExercicioFile = "submod3.1_ativ1.mp3"
                                }
                            }
                        }
                    }
                },
                new SubModule{
                    SubModuleNumberOrder = 2,
                    Title = "Aceitar radicalmente a nossa emoção",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage
                        {
                            PageNumber = 1,
                            Text =@"A aceitação radical da emoção envolve aceitar profundamente todas as nossas emoções, incluindo aquelas que são dolorosas, desconfortáveis e/ou desagradáveis."
                        },
                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 3,
                                    SubModuleNumberOrder = 2,
                                    PageNumber = 2,
                                    ExercicioName = "Aceitar radicalmente a nossa emoção",
                                    ExercicioFile = "submod3.2_ativ1.mp3"
                                }
                            }
                        }
                    }
            },
            new SubModule{
                SubModuleNumberOrder = 3,
                Title = "Reduzir a vulnerabilidade da nossa mente emocional",
                SubModulePages = new List<SubModulePage>
                {
                    new SubModulePage{
                        PageNumber = 1,
                        Text = @"É mais provável que a ingestão alimentar compulsiva ocorra quando as nossas emoções estão desreguladas. Assim, aprendermos a identificar e a alterar o que nos deixa mais vulnerável é fundamental. 
Sugerimos que ouça com atenção as nossas estratégias."
                    },

                    new SubModulePage{
                        PageNumber = 2,
                        Exercicios = new List<Exercicio>
                        {
                            new Exercicio
                            {
                                ModuloNumberOrder = 3,
                                SubModuleNumberOrder = 3,
                                PageNumber = 2,
                                ExercicioName = "Como reduzir a vulnerabilidade?",
                                ExercicioFile = "submod3.3_ativ1.mp3"
                            }
                        }
                    }


                }
            },

            new SubModule{
                SubModuleNumberOrder = 4,
                Title = "Mindfulness das experiências positivas",
                SubModulePages = new List<SubModulePage>
                {
                    new SubModulePage{
                        PageNumber = 1,
                        Text = @"Este exercício ajuda-nos
                         a permanecer mais tempo com as emoções positivas. Quando sentimos dificuldades em controlar a alimentação, tendemos a dedicar pouco tempo a eventos positivos e a anularmos as emoções positivas com preocupações, culpa e autopunições."
                    },
                    new SubModulePage {
                        PageNumber = 2,
                        Exercicios = new List<Exercicio>
                        {
                            new Exercicio
                            {
                                ModuloNumberOrder = 3,
                                SubModuleNumberOrder = 4,
                                PageNumber = 2,
                                ExercicioName = "Mindfulness das experiências positivas",
                                ExercicioFile = "submod3.4_ativ1.mp3"
                            }
                        }
                    }
        }
            },
            new SubModule{
                SubModuleNumberOrder = 5,
                Title = "Agir de forma oposta à emoção do momento",
                SubModulePages = new List<SubModulePage>
                {
                    new SubModulePage{
                        PageNumber = 1,
                        Text = @"Este exercício possibilita mudar ou gerir melhor as nossas emoções, agindo de forma oposta ao que estamos a sentir. 
Convidamo-la a ouvir os nossos exemplos."
                    },
                    new SubModulePage{
                        PageNumber = 2,
                        Exercicios = new List<Exercicio>
                        {
                            new Exercicio
                            {
                                ModuloNumberOrder = 3,
                                SubModuleNumberOrder = 5,
                                PageNumber = 2,
                                ExercicioName = "Agir de forma oposta à emoção presente",
                                ExercicioFile = "submod3.5_ativ1.mp3"
                            }
                        }
                    }
                }
            }

        }
        };
        var modulo4 = new ModuloContent
        {
            ModuleNumberOrder = 4,
            Title = "Tolerância a estados emocionais dolorosos",
            IntroText = @"Os exercícios deste módulo são úteis quando estamos a sentir emoções dolorosas, angustiantes ou desconfortáveis em situações que não podemos controlar ou em situações que nos sentimos emocionalmente sobrecarregadas e mais nada parece resultar.",
            SubModules = new List<SubModule>
            {
                new SubModule{
                    SubModuleNumberOrder = 1,
                    Title = "Observar a respiração",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage{
                            PageNumber = 1,
                            Text = @"A respiração ajuda-nos a estar concentradas, acalmando a mente. É particularmente útil quando nos sentimos agitadas, distraídas e/ou preocupadas."
                        },

                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 1,
                                    PageNumber = 2,
                                    ExercicioName = "Observar a respiração",
                                    ExercicioFile = "submod4.1_ativ1.mp3"
                                }
                            }
                        }
                    }
                },
                new SubModule{
                    SubModuleNumberOrder = 2,
                    Title = "Meio Sorriso",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage{
                            PageNumber = 1,
                            Text = @"Este exercício ajuda-nos a desenvolver
                             uma atitude de aceitação interna. Quando os músculos faciais estão tensos é muito difícil aceitarmos algo, mas quando assumimos um sorriso calmo, aumentamos a nossa disponibilidade para aceitar o que sentimos. "
                        },
                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 2,
                                    PageNumber = 2,
                                    ExercicioName = "Meio sorriso",
                                    ExercicioFile = "submod4.2_ativ1.mp3"
                                }
                            }
                        }

                    }
                },
                new SubModule{
                    SubModuleNumberOrder = 3,
                    Title = "Aceitação radical",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage{
                            PageNumber = 1,
                            Text = @"Quando aceitamos radicalmente, 
                            aceitamos as coisas tal como elas são. Existem circunstâncias que nos causam dor e que, não podendo modificá-las, podemos tentar aceitá-las, em vez de lutarmos contra esses sentimentos dolorosos."
                        },
                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {

                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 3,
                                    PageNumber = 2,
                                    ExercicioName = "Aceitação radical",
                                    ExercicioFile = "submod4.3_ativ1.mp3"
                                }
                            }
                        }
                    }
                },

                new SubModule{
                    SubModuleNumberOrder = 4,
                    Title = " O sofrimento é a não aceitação da dor",
                     SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage{
                            PageNumber = 1,
                            Text = @"Quando nos esforçamos para evitar ou negar a dor, estamos apenas a aumentar o nosso sofrimento. A aceitação não significa que a dor vai desaparecer, mas que sofremos menos quando a aceitamos."
                        },
                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 4,
                                    PageNumber = 2,
                                    ExercicioName = "Aceitar a dor de uma situação atual",
                                    ExercicioFile = "submod4.4_ativ1.mp3"
                                }
                            }
                        }
                    }
                },

                new SubModule
                {
                    SubModuleNumberOrder = 5,
                    Title = "Sobrevivência às crises",
                    SubModulePages = new List<SubModulePage>
                    {
                        new SubModulePage{
                            PageNumber = 1,
                            Text = @"Estas atividades podem ser muito úteis em momentos dolorosos sobre os quais nada podemos fazer ou nada podemos fazer naquele momento.
Sugerimos que ouça com atenção as atividades que propomos."
                         },

                        new SubModulePage{
                            PageNumber = 2,
                            Exercicios = new List<Exercicio>
                            {
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 5,
                                    PageNumber = 2,
                                    ExercicioName = "Sobrevivência às crises - Parte 1",
                                    ExercicioFile = "submod4.5_ativ1.mp3"
                                },
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 5,
                                    PageNumber = 2,
                                    ExercicioName = "Sobrevivência às crises - Parte 2",
                                    ExercicioFile = "submod4.5_ativ2.mp3"
                                },
                                new Exercicio
                                {
                                    ModuloNumberOrder = 4,
                                    SubModuleNumberOrder = 5,
                                    PageNumber = 2,
                                    ExercicioName = "Sobrevivência às crises - Parte 3",
                                    ExercicioFile = "submod4.5_ativ3.mp3"
                                }

                            }
                        }
                    }
            },

            new SubModule{
                SubModuleNumberOrder = 6,
                Title = "Fim!",
                SubModulePages = new List<SubModulePage>
                {
                    new SubModulePage{
                        PageNumber = 1,
                        Text = @"Parabéns por terminar esta viagem que certamente não foi fácil nem simples, mas ainda assim persistiu na sua recuperação. Agora que já conhece e praticou os exercícios de mindfulness, 
regulação emocional e de tolerância a estados emocionais negativos, o objetivo é que tente continuar a realizá-los com frequência e sempre que sentir que são necessários, integrando-os na sua vida."

                }
                }
            }
        }
        };

        modulos.Add(modulo1);
        modulos.Add(modulo2);
        modulos.Add(modulo3);
        modulos.Add(modulo4);

        return modulos;



    }
}