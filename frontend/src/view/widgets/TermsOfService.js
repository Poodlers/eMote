import Popup from "reactjs-popup"
import React from 'react';
import { Box, Button, List, Paper, Typography } from "@mui/material";

function TermsOfService(props) {
   
    return(
        <Popup open={props.trigger} position="right center" >
            <Paper sx={{backgroundColor: 'white', width: '80vw' }}>
                
            <Typography variant="h2" align="center" color="primary" sx={{marginTop: '20px'}}>
                Termos de Utilização da eMote
            </Typography>
            <List sx= {{overflow: 'auto',
                maxHeight: '70vh'}}>
            <Typography variant="body1" align="justify" color="primary" sx={{marginTop: '20px', p: 2}}>  
                <p>
                Estes termos de utilização regem o uso da aplicação eMOTE e foram elaborados ao abrigo do novo Regulamento Geral sobre a Proteção de Dados (RGPD), que entrou em vigor a 25 de maio de 2018. Ao utilizar a eMOTE está a aceitar os presentes termos de utilização.
                 Caso não concorde com estes termos, por favor, não utilize esta aplicação. 

                </p>
                <ol>
                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                    A eMOTE é uma aplicação de autoajuda
                    para mulheres que apresentem episódios de ingestão alimentar compulsiva. 
                    A aplicação foi desenvolvida no âmbito de um projeto de doutoramento da 
                    Faculdade de Psicologia e de Ciências da Educação da Universidade do Porto
                    (FPCEUP), financiado pela Fundação para a Ciência e a Tecnologia com a
                    referência 2021.08470.BD. Este projeto de doutoramento é supervisionado
                    por docentes do Centro de Psicologia da Universidade do Porto da FPCEUP, 
                    York St John University e Universidade da Maia. O desenvolvimento da eMOTE 
                    contou também com a colaboração de elementos da Faculdade de Engenharia da 
                    Universidade do Porto, da Faculdade de Belas Artes da Universidade do Porto 
                    e da Stanford University School of Medicine. 
                </li>
                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                A eMOTE tem como objetivo fornecer estratégias com base numa terapia já estudada para 
                a ingestão alimentar compulsiva e que foi adaptada para esta aplicação. O conteúdo 
                disponibilizado na eMOTE pretende promover uma melhor regulação emocional e uma 
                redução dos episódios de ingestão alimentar compulsiva e dificuldades associadas.
                No entanto, <b> a utilização da eMOTE não substitui o diagnóstico ou tratamento por um
                profissional de saúde especializado. </b>

                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                 Apenas poderá utilizar a eMOTE se tiver pelo menos 18 anos.
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                <b>Caso tenha recebido o diagnóstico ou apresente sintomas de uma perturbação do espetro
                     da esquizofrenia/psicose, perturbação bipolar, perturbação borderline da personalidade,
                      abuso de substâncias ou ideação suicida (i.e., ideias de fazer mal a si mesma),
                     a utilização da eMOTE não é recomendada e deve pedir ajuda presencial especializada.  </b>
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                <b>Caso esteja grávida ou a amamentar a utilização da 
                eMOTE não é recomendada. Deve procurar apoio psicológico presencial.</b>
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                Apesar da eMOTE incorporar uma intervenção psicológica
                 destinada aos episódios de ingestão alimentar compulsiva,
                isso não significa que esta intervenção seja eficaz com todas as pessoas.
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                Ao utilizar a eMOTE assume total responsabilidade pelo uso que faz da
                 informação contida na aplicação. A equipa da eMOTE não se responsabiliza por qualquer reclamação, 
                 perda ou dano resultante do uso da informação contida na aplicação. A sua utilização 
                da eMOTE constitui a sua concordância com as disposições da declaração de exoneração de responsabilidade.
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                	A equipa responsável por esta aplicação reconhece a importância da sua privacidade
                 e compromete-se a ativamente proteger a integridade da sua informação pessoal e 
                 a mantê-la segura, tendo adotado diversas medidas neste sentido. Enquanto 
                 utilizadora da eMOTE é também responsável por manter a segurança da sua conta.
                  <b>Não partilhe as suas credenciais de acesso (código e palavra-passe) com outras 
                  pessoas e notifique-nos se suspeitar de algum acesso não autorizado à
                   sua conta.</b>
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                  Tipos de dados pessoais tratados e finalidade do tratamento:

                  <ul>
                    <li>
                    Ao utilizar esta aplicação, serão recolhidos dados relativos ao
                    número de logins, tempo disponibilizado em cada módulo e submódulo,
                    exercícios favoritos, informação inserida no diário das refeições 
                    e das emoções, bem como a utilidade e a satisfação relativa a cada
                    módulo, identificados apenas pelo seu código de participante no
                    estudo. Estes dados codificados serão inicialmente recolhidos em 
                    servidores da fly.io, empresa responsável pelo alojamento e
                    manutenção da eMOTE, sendo posteriormente descarregados para 
                    os computadores da equipa de investigação, que os associará à
                    informação recolhida através dos questionários online e os
                    utilizará exclusivamente para fins de investigação científica.
                    Ao utilizar a eMOTE está a autorizar a recolha e uso destes
                        dados por parte da equipa de investigação.
                    </li>
                    <li>
                    Toda a informação será mantida de forma codificada e conservada somente durante o tempo 
                    necessário para atingir os objetivos do estudo, sendo apenas acedida pelos membros da
                    equipa de investigação.

                    </li>
                  </ul>
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                 Direitos que pode exercer enquanto titular de dados

                 <ul>
                    <li>
                    <span style={{textDecoration: 'underline'}}>Acesso:</span> 

                    Sempre que pretender, pode obter confirmação de que os seus dados pessoais
                     são tratados pela equipa responsável pela aplicação e, se for esse o caso, 
                     tem o direito a aceder-lhes e a receber um conjunto de informação sobre a
                      forma como são tratados, incluindo a finalidade dos 
                    tratamentos a que são sujeitos e o prazo previsto para a sua conservação. 
                    </li>
                    <li>
                        
                <span style={{textDecoration: 'underline'}} >Retificação:</span> Sempre que 
                considerar que os seus dados pessoais estão incompletos ou inexatos, 
                pode requerer a sua retificação ou que os mesmos sejam completados.

                    </li>

                    <li>
                    <span style={{textDecoration: 'underline'}} >Limitação do tratamento:</span> 
                    Em determinadas situações, pode solicitar que o tratamento dos seus dados
                     pessoais 
                    seja limitado, impondo dessa forma uma restrição à respetiva utilização.
                    </li>

                    <li>
                    <span style={{textDecoration: 'underline'}} >Portabilidade:</span> 
                    Tem o direito de solicitar os dados pessoais que são tratados pela equipa de
                     investigação da eMOTE, num formato estruturado, de uso corrente e de leitura 
                     automática, assim como o direito de transmitir esses dados a outro responsável
                      pelo tratamento sem que o
                     responsável a quem os dados pessoais foram fornecidos o possa impedir. 
                    </li>
                    <li>
                    <span style={{textDecoration: 'underline'}} >Revogação do consentimento:</span> 
                    Caso deseje que os seus dados deixem de ser recolhidos e tratados para utilização
                    neste estudo, pode retirar o seu consentimento a qualquer momento, através do email
                    abaixo indicado, sem que isso comprometa 
                    a licitude do tratamento efetuado com base no consentimento previamente dado. 
                    </li>
                    <li>
                    <span style={{textDecoration: 'underline'}} >Apagamento:</span> 
                    Pode solicitar que os seus dados pessoais sejam apagados a qualquer momento, 
                    usando o email abaixo indicado. Nesse caso, deixará de poder aceder à eMOTE. 
                    </li>
                    
                 </ul>
                <p> 
                Para solicitar o exercício destes direitos, deverá contactar a equipa
                de investigação através do email emote@fpce.up.pt. No entanto, 
                sublinhamos que o exercício dos mesmos poderá ser limitado, se já não 
                for possível identificar os dados que lhe dizem respeito ou se se
                entender que comprometerá a realização do estudo.
                </p>
                <p>
                Para esclarecer quaisquer dúvidas sobre esta matéria pode contactar a Encarregada da 
                Proteção de Dados da U.Porto, para dpo@reit.up.pt. Caso considere que os seus dados não
                estão a ser objeto de tratamento legítimo, tem também o direito de apresentar uma
                reclamação junto da Comissão Nacional de Proteção de Dados (https://www.cnpd.pt/).  
                </p>
                
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                <b>Pode, a qualquer momento, desistir de utilizar a eMOTE</b> 
                (sem ter de indicar ou justificar o motivo para o fazer), e sem
                 qualquer tipo de penalização. 
                </li>

                <li style={ 
                    {
                    paddingBottom: '20px'
                    }
                
                }>
                Os conteúdos e design da eMOTE são propriedade da equipa de 
                investigação e estão protegidos por direitos de autor.<b>
                     A utilização da eMOTE fora deste estudo ou a reprodução dos seus
                      materiais não está autorizada.</b>
                </li>

                <li>
                A equipa de investigação da eMOTE reserva-se ao direito de suspender, 
                remover ou alterar qualquer
                 conteúdo da aplicação, a qualquer momento, por qualquer razão, sem aviso prévio. 
                </li>
                </ol>
               
            </Typography>

        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2}}>
        <Button color={'white'} sx={{ mr:'1vw', pt:1, width: '25vw' , textAlign: 'center', fontSize: 18, fontWeight: 500, backgroundColor: '#f28db2', 
            ":hover": {
                backgroundColor: '#f28db2',
                opacity: '0.8'
            }
        }} variant='body1' onClick={() => props.onDisagree(true)}>
                Discordo
            </Button>
            <Button color={'white'} sx={{ pt:1, width: '25vw', textAlign: 'center', fontSize: 18, fontWeight: 500, backgroundColor: '#067089', 
            ":hover": {
                backgroundColor: '#067089',
                opacity: '0.8'
            }
        }} variant='body1' onClick={() => props.onAgree()}>
                Concordo
            </Button>
        </Box>


        </List>
        </Paper>
    </Popup>
    );


}

export default TermsOfService;