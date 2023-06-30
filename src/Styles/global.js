import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`　
*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}
body{
    background-color : ${({ theme }) => theme.background};
    color:${({ theme }) => theme.textColor};
    transition : all 0.25s linear;
}
.canvas{
    display : grid;
    min-height : 100vh;
    grid-auto-flow : row;
    grid-template-row : auto 1fr auto;
    gap:0.5rem; 
    padding:2rem;
    width:100vw;
    align-items:center;
    text-align:center;
}

.type-box{
    display:block;
    max-width:1000px;;
    height: 240px;
    margin-right:auto;
    margin-left:auto;
    overflow:hidden;
    
}
.words{
    font-size:32px;
    display:flex;
    flex-wrap:wrap;
    color : ${({ theme }) => theme.typeBoxText};
}
.word{
    margin:5px;
    padding-right:2px;
   
}
.hidden-input{
    opacity:0;
}
.active{
    border-left:1px solid;
    animation: blinking 2s infinite;
    animation-timing-function :ease;
    @keyframes blinking{
        0%{border-left-color:${({ theme }) => theme.textColor}}
        25%{border-left-color:${({ theme }) => theme.background}}
        50%{border-left-color:${({ theme }) => theme.textColor}}
        75%{border-left-color:${({ theme }) => theme.background}}
        100%{border-left-color:${({ theme }) => theme.textColor}}
    }
}
.active-right{
    border-right:1px solid;
    animation: blinking-right 2s infinite;
    animation-timing-function :ease;
    @keyframes blinking-right{
        0%{border-right-color:${({ theme }) => theme.textColor}}
        25%{border-right-color:${({ theme }) => theme.background}}
        50%{border-right-color:${({ theme }) => theme.textColor}}
        75%{border-right-color:${({ theme }) => theme.background}}
        100%{border-right-color:${({ theme }) => theme.textColor}}
    }
}
.correct{
    color:${({ theme }) => theme.textColor};
}
.incorrect{
    color:red;
}

.upper-menu{
    display:flex;
    width : 1000px;
    margin-left:auto;
    margin-right: auto;
    font-size:1.3rem;
    justify-content: space-between;
    padding 0.5rem;

}
.modes{
    display:flex;
    gap:0.4rem;
    
}
.time-mode:hover{
    color:green;
    cursor:pointer;
}

.footer{
    width:1000px;
    display:flex;
    justify-content: space-between;
    margin-left:auto;
    margin-right: auto;
}
.stats-box{
    display:flex;
    width:1000px;
    height : auto;
    margin-left:auto;
    margin-right: auto;
}
.left-stats{
    width : 30%;
    padding : 30px;
}
.right-stats{
    width : 70%;

}
.title{
    font-size : 20px;
    color : ${({ theme }) => theme.typeBoxText};

}
.subtitle{
    font-size : 30px;
}

.header{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right: auto;
}
.logo-img{
    width:30px;
    height:30px;
    margin-bottom:1.5px;
}
.logo{
    display:flex;
    flex-direction:column;
    align-items:center;
   
}
.userpage-container {
    max-width: 1000px;
    max-height : 20rem;
    margin: auto; 
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    
  }
  .user-profile{
    width:1000px;
    margin-top:1.5rem; 
    display:flex;
    background : ${({ theme }) => theme.typeBoxText};
    border-radius : 20px;
    align-items:center;
    justify-content:center;
    padding : 1rem;
  }
  .user{
    width:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 1.5rem;
    border-right : 2px solid ;
    margin-left: 3.8rem;

  }
  .info{
    width:55%;
    padding : 1rem;
    margin-left: 3.8rem;
  }
  .total-tests{
    width:50%;
    font-size: 1.5rem;
    display:flex;
    flex-direction : column;
    align-items:center;
    justify-content:center;
  }
  .table, .graph-user-page{
    margin:auto;
    width:1000px;
  }
  .center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content:center;
    align-items:center;
  }


  .custom-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  animation-name: loader-animation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  opacity: 0.8;
}

.dot1 {
  background-color: #ff5722;
  animation-delay: 0s;
}

.dot2 {
  background-color: #673ab7;
  animation-delay: 0.2s;
}

.dot3 {
  background-color: #4caf50;
  animation-delay: 0.4s;
}

.dot4 {
  background-color: #f44336;
  animation-delay: 0.6s;
}

.dot5 {
  background-color: #2196f3;
  animation-delay: 0.8s;
}

@keyframes loader-animation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
.social-link {
  color: ${({ theme }) => theme.textColor};
  transition: color 0.25s linear;
  margin-left: 0.5rem;
}

.social-link:hover {
  color: ${({ theme }) => theme.typeBoxText};
}
  
  
`;
