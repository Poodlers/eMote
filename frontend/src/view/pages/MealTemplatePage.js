import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate, useParams } from 'react-router-dom';

import imgPqnoAlmoco from '../../assets/images/p_almoco.png'
import imgLancheManha from '../../assets/images/lanche_manha.png'
import imgAlmoco from '../../assets/images/almoco.png'
import imgLancheTarde from '../../assets/images/lanche.png'
import imgJantar from '../../assets/images/jantar.png'
import imgCeia from '../../assets/images/ceia.png'
import imgOutraRef from '../../assets/images/outra_refeicao.png'
import SkipMeal from '../widgets/MealDiary/SkipMeal';
import TimeMeal from '../widgets/MealDiary/TimeMeal';
import FeelingMeal from '../widgets/MealDiary/FeelingMeal';
import DescriptionMeal from '../widgets/MealDiary/DescriptionMeal';
import CompensationMeal from '../widgets/MealDiary/CompensationMeal';
import CommentsMeal from '../widgets/MealDiary/CommentsMeal';
import CheckboxTemplate from '../widgets/MealDiary/CheckboxTemplate';
import { TipoRefeicao } from '../../models/TipoRefeicao';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';

const errorMessagesText = {
    TimeOfMeal: 'Por favor, indique a hora da refeição',
    FeelingsAroundMeal: 'Por favor, indique os sentimentos em torno da refeição',
    ContentsOfMeal: 'Por favor, indique o que comeu',
    Reflexao: 'Por favor, preencha a reflexão',
}


const imageList = [
    {
        meal: 'Pequeno Almoço',
        link: 'pqnoalmoco',
        enumValue : TipoRefeicao.PequenoAlmoco,
        image: imgPqnoAlmoco
    },
    {
        meal: 'Lanche da Manhã',
        link: 'lanchemanha',
        enumValue : TipoRefeicao.LancheDaManha,
        image: imgLancheManha
    },
    {
        meal: 'Almoço',
        link: 'almoco',
        enumValue : TipoRefeicao.Almoco,
        image: imgAlmoco
    },
    {
        meal: 'Lanche da Tarde',
        link: 'lanche',
        enumValue : TipoRefeicao.LancheDaTarde,
        image: imgLancheTarde
    },
    {
        meal: 'Jantar',
        link: 'jantar',
        enumValue : TipoRefeicao.Jantar,
        image: imgJantar
    },        
    {
        meal: 'Ceia',
        link: 'ceia',
        enumValue : TipoRefeicao.Ceia,
        image: imgCeia
    },
    {
        meal: 'Outra Refeição',
        link: 'outraref',
        enumValue : TipoRefeicao.Outra,
        image: imgOutraRef
    },
]

function MealTemplatePage() {
    const { meal } = useParams();
    var mealImage = null;
    var mealName = null;
    var mealEnum = null;
    for (const obj of imageList) {
        if (obj.link == meal) {
            mealImage = obj.image;
            mealEnum = obj.enumValue;
            mealName = obj.meal;
        }
    }

  const repository = RepositorySingleton.getInstance().injectRepository();
  const navigate = useNavigate();   
  const user = JSON.parse(localStorage.getItem('user'));
  const [errorMessages, setErrorMessages] = React.useState([]);
  const submitMealDiary = () => {
      
        const foodDiary = 
            skippedMeal ? {
                date : new Date().toLocaleString().split(',')[0],
                hour : new Date().toLocaleString().split(',')[1].trimStart(),
                tipoRefeicao : mealEnum,
                skippedMeal : skippedMeal,
            } : 
            {
                date : new Date().toLocaleString().split(',')[0],
                hour : new Date().toLocaleString().split(',')[1].trimStart(),
                tipoRefeicao : mealEnum,
                skippedMeal : skippedMeal,
                timeOfMeal : timeOfMeal,
                feelingsAroundMeal : feelingsAroundMeal,
                contentsOfMeal : contentsOfMeal,
                plainAttention : plainAttention,
                restrainedConsumption : restrainedConsumption,
                hadAnEpisode : hadAnEpisode,
                hadCompensatoryBehaviour : user.role == 2 ? hadCompensatoryBehaviour : null,
                compensatoryBehaviors : user.role == 2 ? compensatoryBehaviors : null,
                reflexao : reflexao,
            }

       
        setErrorMessages('');

        repository.addFoodDiaryEntry(foodDiary).then((response) => {
            console.log(response);
            navigate('/mealdiary');
        }).catch((error) => {
            let errors = [];
            //iterate error.response.data.errors and set error messages
            for (const key in error.response.data.errors) {
                if (error.response.data.errors.hasOwnProperty(key)) {
                    errors.push(errorMessagesText[key]);
                }
            }
           
            setErrorMessages(errors);
            console.log(errorMessages);
        }
        );


    };
    const [hasAlreadyFilled, setHasAlreadyFilled] = React.useState(false);
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [skippedMeal, setSkippedMeal] = React.useState(false);
   
    const [timeOfMeal, setTimeOfMeal] = React.useState(new Date().toLocaleString().split(',')[1].trimStart());
    const [feelingsAroundMeal, setFeelingsAroundMeal] = React.useState([]);
    const [contentsOfMeal, setContentsOfMeal] = React.useState('');
    const [plainAttention, setPlainAttention] = React.useState(false);
    const [restrainedConsumption, setRestrainedConsumption] = React.useState(false);
    const [hadAnEpisode, setHadAnEpisode] = React.useState(false);
    const [hadCompensatoryBehaviour, setHadCompensatoryBehaviour] = React.useState(false);
    const [compensatoryBehaviors, setCompensatoryBehaviors] = React.useState([]);
    const [reflexao, setReflexao] = React.useState("");


    useEffect(() => {
        repository.checkIfMealDiaryIsAlreadyAdded(mealEnum).then((response) => {

            if(!response){
                setHasAlreadyFilled(false);
            }else{
                setHasAlreadyFilled(true);
                setSkippedMeal(response.skippedMeal);
                setTimeOfMeal(response.timeOfMeal);
                setFeelingsAroundMeal(response.feelingsAroundMeal);
                setContentsOfMeal(response.contentsOfMeal);
                setPlainAttention(response.plainAttention);
                setRestrainedConsumption(response.restrainedConsumption);
                setHadAnEpisode(response.hadAnEpisode);
                setHadCompensatoryBehaviour(response.hadCompensatoryBehaviour);
                setCompensatoryBehaviors(response.compensatoryBehaviors);
                setReflexao(response.reflexao);

            }
            setComponentState(ComponentState.LOADED);

        }).catch((error) => {
            setComponentState(ComponentState.ERROR);
            console.log(error);

        }
        );
    }, []);

            



  return (

        <Box sx= {{backgroundColor: '#01698b', width:'100vw', height:'100vh' }}>
            {
            componentState == ComponentState.LOADING ?
            <Typography color="primary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
                Carregando...
            </Typography>
            :
            componentState == ComponentState.ERROR ?
            <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
                Erro ao carregar página
            </Typography>    
            :
            <Box sx={{mt:'10px', mb:'10px', backgroundColor: '#01698b'}}>
            <Box sx ={{p:1, bgcolor: '#349db7', alignContent: 'center', width: '80%', m: '0 auto'}}>
                <Grid container spacing={2}>
                    <Grid item >
                        <IconButton component={Link} to="/mealdiary" aria-label="back" size="large">
                            <ArrowBackIosIcon color='info' fontSize="inherit" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{ display:'flex', alignItems:'center', }}>
                        <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                            {mealName}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
                <div style={{ padding: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                    <img alt="logo" style={{ alignSelf: 'center' }} src={mealImage} />
                </div>

            <Box sx={{p:2}}>
                <SkipMeal initialValue = {skippedMeal} readOnly={hasAlreadyFilled} setSkippedMeal = {setSkippedMeal}/>
                {skippedMeal ? null : <div> 
                    <TimeMeal  initialValue = {timeOfMeal} readOnly={hasAlreadyFilled} setTimeOfMeal = {setTimeOfMeal}/>
                    <FeelingMeal  initialValue = {feelingsAroundMeal} readOnly={hasAlreadyFilled} setFeelings = {setFeelingsAroundMeal}/>
                    <DescriptionMeal initialValue = {contentsOfMeal} readOnly={hasAlreadyFilled} setContentsOfMeal = {setContentsOfMeal}/>
                    <CheckboxTemplate initialValue = {plainAttention} readOnly={hasAlreadyFilled} setCheck = {setPlainAttention} text="Comi com atenção plena" id='attention' />
                    <CheckboxTemplate initialValue = {restrainedConsumption} readOnly={hasAlreadyFilled} setCheck = {setRestrainedConsumption} text="Restringi propositadamente a quantidade de alimentos" id='restriction'/>
                    <CheckboxTemplate initialValue = {hadAnEpisode} readOnly={hasAlreadyFilled} setCheck={setHadAnEpisode} text="Tive um episódio de ingestão compulsiva" id='episode'/>
                    {
                        user.role == 2 ?
                        <CompensationMeal initialValue = {compensatoryBehaviors} readOnly={hasAlreadyFilled} setBehaviours ={setCompensatoryBehaviors} setHadBehaviour = {setHadCompensatoryBehaviour}  />
                        :
                        null
                    }
                    
                    <CommentsMeal initialValue = {reflexao} readOnly={hasAlreadyFilled} setReflection = {setReflexao }/>
                    </div>
                    }
                {errorMessages.length > 0 ?
                        errorMessages.map((error) => {
                                return (
                                    <Box sx ={{ p:1, mb: 5,bgcolor: '#f28db2' }} textAlign='center'>
                                        <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                                            {error}
                                        </Typography>
                                    </Box>
                                )
                            }
                            )            
                    : null
                }


                {
                    hasAlreadyFilled ? <></>:
                    <Box sx ={{ p:3 }} textAlign='center'>
                        <Button sx ={{ p:1, bgcolor: '#349db7' }} onClick={submitMealDiary}>
                            <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                                Confirmar
                            </Typography>
                        </Button>
                    </Box>
                }
                
            </Box>
        </Box>

        }
        
        </Box>
  );
}

export default MealTemplatePage;
