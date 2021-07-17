import React from 'react'
import styled from 'styled-components'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault , OrkutNostalgicIconSet} from '../src/lib/alurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return(
    <Box>
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

export default function Home() {
  const [comunidades, setComunidades] = React.useState(['Alurakut'])
  console.log('nosso test', comunidades);
  const GithubUser = 'NylipekWolf'; 
  const PessoasQueEuAdmiro = ['CaioemanuelIF', 'TawaneSouzaOL', 'WilliamAraujo777', 'LincolnPerez', 
  'cecilianeves22', 'lettyfrancaxx', 'gabaugusto', "Marcoantonio-2001", 'RaianNolaco'
  ];

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
              
              const comunidadesAtualizadas = [...comunidades, "Alura Stars"]
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
                  name="title" 
                  aria-label="Coloque uma URL para usamos de capa"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style ={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ul>
              {comunidades.map((itemAtual) =>{
                return(
                  <li>
                    <a href={`/user/${itemAtual}`} key={itemAtual}>
                    <img src = {`https://github.com/NylipekWolf.png`} />
                    <span>{itemAtual}</span>
                  </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              pessoas que eu admiro ({PessoasQueEuAdmiro.length})
            </h2>

            <ul>
              {PessoasQueEuAdmiro.map((itemAtual) =>{
                return(
                  <li>
                    <a href={`/user/${itemAtual}`} key={itemAtual}>
                    <img src = {`https://github.com/${itemAtual}.png`} />
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
