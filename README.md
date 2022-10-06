# server
server


# git bash 다운로드
[gitbash 다운로드] (https://git-scm.com/download/win).
깃배시는 리눅스 커널 형식을 윈도우에서 쓰게 해주는 cmd
생각해보니 오빠는 맥이라서 그냥 해도될지도,,?

이걸 설치하면 자동으로 git도 설치해줌
이걸로 깃 커밋을 진행


# git init
프로젝트를 작업할 위치에 폴더를 생성한 후   
git bash로 git init 명령어 실행   
숨겨진 폴더보기를 하면 .git 이 설치된것을 볼 수 있음   
이제 여기서 cmd창에서 git add, pull, commit, push등을 진행하면 됨   


# git ssh키 생성 및 등록
[ssh키 생성하는법] (https://www.hanumoka.net/2020/04/16/git-20200416-git-ssh-key-generate/).   
생각해보니 이거도 window,,   
이걸 등록해놓으면 번거롭게 git push를 할때마다 이메일 비번을 치지 않아도 됩니다!   


# git add, commit, push 
차례대로 1.add, 2.commit, 3.push를 진행하면됨    
add는 stage에 작업한 내역을 더하는것     
commit는 작업한 내역을 커밋 단위로 올리는 것   
push는 이때까지 제출한 커밋(들)을 한번에 깃에 업로드하는것   
보통 git add . 를 통해 폴더에 있는 모든 내용을 add한다   
이후에 git commit -m "간단한 진행내용 주석달기" 를 통해 add한 내용을 commit   
그 이후에 git push origin main 등을 통해 push한다   
아마 이 과정에서 에러가 날 수 있는데 이때는 git pull origin master를 통해   
git에 올려진 내용을 전부 한번 내려받기 한후에 진행하면 잘 된다   
또는 git config --global 어쩌구 라면서 이메일과 username을 최초등록을 하라고하면   
github프로필에 있는 username 과 이메일을 한번 등록해주면된다   


# node express 시작하기
만약 npm이 깔려있지 않다면 npm을 먼저 설치해준다   
현재까지 업로드된 내용은 아래링크를 따라한것   
[node express 시작하기] (https://velog.io/@kimhyo_0218/Node.js-express.js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0).
