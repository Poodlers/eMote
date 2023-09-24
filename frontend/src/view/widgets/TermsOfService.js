import Popup from "reactjs-popup"
import React from 'react';
import { Box, Button, List, Paper, Typography } from "@mui/material";

function TermsOfService(props) {
   
    return(
        <Popup open={props.trigger} position="right center" >
            <Paper sx={{backgroundColor: 'white', width: '80vw' }}>
                
            <Typography variant="h2" align="center" color="primary" sx={{marginTop: '20px'}}>
                Termos de Serviço
            </Typography>
            <List sx= {{overflow: 'auto',
                maxHeight: '70vh'}}>
            <Typography variant="body1" align="center" color="primary" sx={{marginTop: '20px'}}>  
                <p> 
                    <b> Última Atualização: [20/09/2023]
                </b>
                </p>
            <p><b>
                Estes Termos e Condições ("Termos") regem o uso da aplicação [Nome da Sua App], 
                a seguir referida como "App," fornecida por [Nome da Sua Empresa], a seguir referida como "Empresa."
                Ao acessar ou usar a App, você concorda em cumprir estes Termos. Se você não concordar com estes Termos
                , por favor, não utilize a App.
            </b>
            </p>

        
        <p><b>1. Aceitação dos Termos</b></p>

        <p>1.1 Ao usar a App, você declara ter lido, compreendido e concordado em cumprir estes Termos.</p>

        <p>1.2 Estes Termos podem ser atualizados ou modificados pela Empresa periodicamente. 
            Você concorda em revisar estes Termos periodicamente para garantir sua contínua conformidade.</p>
        
        <p><b>2. Registro</b></p>

        <p>2.1 Para acessar determinados recursos da App,
             você poderá ser obrigado a criar uma conta. Você concorda em fornecer informações precisas, atuais e 
             completas durante o processo de registro. </p>
        <p>2.2 Você é responsável por manter a segurança e a confidencialidade
             de suas credenciais de conta e é o único responsável por todas as atividades que ocorrem em sua conta.</p>
        
        <p><b>3. Uso da App</b></p>

        <p>3.1 Você concorda em usar a App apenas para fins lícitos e de acordo com estes Termos, 
            quaisquer leis e regulamentos aplicáveis.</p>
        <p>3.2 Você não pode usar a App para se envolver em atividades prejudiciais, abusivas, ofensivas ou que violem os direitos de terceiros.</p>
        
        <p><b>4. Política de Privacidade</b></p>

        <p>4.1 Seu uso da App também é regido pela nossa Política de Privacidade, que pode ser encontrada [inserir link para a Política de Privacidade]. Ao utilizar a App, você consente na coleta e utilização de suas informações conforme descrito na Política de Privacidade.
</p>
        <p><b>5. Propriedade Intelectual</b></p>

        <p>5.1 A App e todo o seu conteúdo, incluindo, mas não se limitando a textos, gráficos, logotipos e software, são propriedade da Empresa e estão protegidos por leis de direitos autorais e outras leis de propriedade intelectual.</p>
        5.2 É concedida uma licença limitada, não exclusiva e intransferível para usar a App para seu propósito pretendido. Você não pode modificar, reproduzir, distribuir ou criar trabalhos derivados baseados na App sem o consentimento expresso por escrito da Empresa.

        <p><b>6. Rescisão</b></p>

        <p>6.1 A Empresa reserva-se o direito de suspender ou encerrar seu acesso à App a qualquer momento e por qualquer motivo, sem aviso prévio.</p>
        
        <p><b>7. Isenção de Garantias</b></p>

        <p>7.1 A App é fornecida "como está" e "conforme disponível" sem garantias de qualquer tipo, sejam expressas ou implícitas.</p>
        <p><b> 8. Limitação de Responsabilidade</b></p>

        <p>8.1 Na extensão máxima permitida por lei, a Empresa não será responsável por quaisquer danos indiretos, incidentais, especiais, consequentes ou punitivos, ou qualquer perda de lucros ou receitas, quer incorridos diretamente ou indiretamente.</p>
        
        <p><b>9. Lei Aplicável</b></p>

        <p>9.1 Estes Termos são regidos e interpretados de acordo com as leis de [Sua Jurisdição].</p>

        <p><b>10. Informações de Contato</b></p>

        <p>10.1 Se você tiver alguma dúvida ou preocupação relacionada a estes Termos, pode nos contatar em [Suas Informações de Contato].
    </p>
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