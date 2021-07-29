import React from 'react'
import styled from 'styled-components'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault , OrkutNostalgicIconSet} from '../src/lib/alurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return(
    <Box as="aside">
      <img src = {`https://github.com/${propriedades.GithubUser}.png`} />
      <hr/>

      <p>
        <a className = "boxLink" href = {`https://github.com/${propriedades.GithubUser}`}>
          @{propriedades.GithubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{

    }]);
  console.log('nosso test', comunidades);
  const GithubUser = 'NylipekWolf'; 
  const PessoasQueEuAdmiro = ['CaioemanuelIF', 'TawaneSouzaOL', 'WilliamAraujo777', 'LincolnPerez', 
  'cecilianeves22', 'lettyfrancaxx', 'gabaugusto', "Marcoantonio-2001", 'RaianNolaco'
  ];

  
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/NylipekWolf/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ac1cd5ab422d9e020373be28fba2ff',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query{
        allCommunities {
          id
          title
          _status
          _firstPublishedAt
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])

  console.log('seguidores antes do return', seguidores);

  return(
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style ={{ gridArea: 'profileArea' }}>
          <Box>
          <ProfileSidebar GithubUser={GithubUser} />
          </Box>
        </div>
        <div className="welcomeArea" style ={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1>
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
            <h2 className="subTitle">O que voce deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosForms = new FormData(e.target);
              console.log('Campo: ', dadosForms.get('title'));
              console.log('Campo: ', dadosForms.get('image'));

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForms.get('title'),
                image: dadosForms.get('image'),
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usamos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usamos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style ={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              comunidades ({comunidades.length})
            </h2>
            <ul>
            {comunidades.slice(0,6).map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/user/${itemAtual.id}`}>
                    <img src = {itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas que eu admiro ({PessoasQueEuAdmiro.length})
            </h2>

            <ul>
              {PessoasQueEuAdmiro.slice(0,6).map((itemAtual) =>{
                return(
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  ) 
}


