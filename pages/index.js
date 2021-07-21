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
    id: '122353464564564535',
    title: 'Proa',
    image: 'https://media-exp1.licdn.com/dms/image/C4D0BAQFD15RCaLy7tA/company-logo_200_200/0/1591018493674?e=1634774400&v=beta&t=ocT6VEz3IVfxJsRy4bhT9ZSSP-pdJUzZ5ydlVc1Kfm0'
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
      method: 'post',
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
            <ul>
              {comunidades.map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/user/${itemAtual.title}`} key={itemAtual.title}>
                    <img src = {itemAtual.image} />
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
              {PessoasQueEuAdmiro.map((itemAtual) =>{
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
