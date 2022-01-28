import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AppConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${AppConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}

//Componente React
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle/>
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>

//         </div>
//     )
// }

// export default HomePage

export default function PaginaInicial() {
    // const username = 'RichardKT88';
    const [username, setUsername] = useState('RichardKT88');
    const roteamento = useRouter();
    const temMenos2Letras = username.length <= 2 ? true : false;

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: AppConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: AppConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infoDoEvento) {
                            infoDoEvento.preventDefault();
                            console.log('Alguém submeteu o form');
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: AppConfig.theme.colors.neutrals[300] }}>
                            {AppConfig.name}
                        </Text>
                        {/* <input
                            type="text"
                            value={username}
                            onChange={function(event) {
                                console.log('Usuário digitou', event.target.value);
                                //Onde tá o valor
                                const valor = event.target.value;
                                setUsername(valor);
                            }}
                        /> */}

                        <TextField
                            value={username}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: AppConfig.theme.colors.neutrals[200],
                                    mainColor: AppConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: AppConfig.theme.colors.primary[500],
                                    backgroundColor: AppConfig.theme.colors.neutrals[800],
                                },
                            }}

                            onChange={function (event) {
                                console.log('Usuário digitou', event.target.value);
                                //Onde tá o valor
                                const valor = event.target.value;
                                setUsername(valor);
                                
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            disabled={temMenos2Letras}
                            fullWidth
                            buttonColors={{
                                contrastColor: AppConfig.theme.colors.neutrals["000"],
                                mainColor: AppConfig.theme.colors.primary[500],
                                mainColorLight: AppConfig.theme.colors.primary[400],
                                mainColorStrong: AppConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: AppConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: AppConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={temMenos2Letras ? '' : `https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: AppConfig.theme.colors.neutrals[200],
                                backgroundColor: AppConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}