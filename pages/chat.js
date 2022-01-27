import { Box, Text, TextField, Image, Button, Icon  } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

export default function ChatPage() {

    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NTcwMywiZXhwIjoxOTU4ODYxNzAzfQ.0LY75JG_VeA1TzsuNHe1atXozvdfw4EtPO3eeTebsSw';
    const SUPABASE_URL = 'https://kdizaecuxyiarimptcfw.supabase.co';
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    //Para lidar coisas que fogem do fluxo padrão(O que tem no nosso return). Se ele não faz parte do fluxo padrão é algo extra.
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log("Dados da consulta: ", data);
                setListaDeMensagens(data);
                setLoading(false);
            });
    }, []);

    /*AULA 04 - 
    fetch("https://api.github.com/users/RichardKT88").then(async(respostaDoServidor) => {
        const respostaEsperada = await respostaDoServidor.json();
        console.log(respostaEsperada);
    })
    - [X] Mostra um loading enquanto está carregando (useEffect não passou);
    - [ ] mouseover sobre a foto da pessoa
    - [ ] mandar pull, imagem ou anexos.
     * /

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
    // Notes
    /*
        - O navegador não trabalha com objetos, ele trabalha com array de React ou um array de strings.
    */
    // Desafio
    /*
        - [X] colocar um botão de Ok que tenha o mesmo comportamento ao pressionar o Enter.
        - [X] colocar um botãozinho de X para apagar a mensagem. Dica: Utilizar o Filter
    */
    function handleNovaMensagem(novaMensagem) {

        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: 'vanessametonini',
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log("Criando mensagem: ", data);
                //Abaixo são lógicas de estado.
                setListaDeMensagens([
                    data[0],
                    //o Spread Operator(...lista) abre todos os item que tem nesta lista e espalha eles na nova, porque senão ele criaria um array dentro de um array.
                    ...listaDeMensagens,
                ]);
            })


        setMensagem('');
    }

    function deletaMensagem(e) {
        const mensagemId = Number(e.target.dataset.id)
        const listaDeMensagensFiltrada = listaDeMensagens.filter((mensagemFiltrada) => {
            return mensagemFiltrada.id !== mensagemId
        })

        setListaDeMensagens(listaDeMensagensFiltrada)
    }


    const content = loading ? <Icon label="Icon Component" name="FaFirefox" size='20ch'/> : <MessageList mensagens={listaDeMensagens} deletaMensagem={deletaMensagem} />
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {content}
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        o map recebe uma entrada do array mapeia e retorna uma saída.
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button label="Ok"
                            fullWidth
                            styleSheet={{
                                maxWidth: '100px',
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            onClick={() => { handleNovaMensagem(mensagem); }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    const deletaMensagem = props.deletaMensagem

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Text
                                onClick={deletaMensagem}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: '#FFF',
                                    backgroundColor: 'rgba(0,0,0,.5)',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                tag="span"
                                data-id={mensagem.id}
                            >
                                X
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}