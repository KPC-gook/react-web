import '../components/LoginModal.css';
import { auth } from '../fbase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginModal = ({ status, setStatus }: any) => {

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (data) => {
      console.log(data);
      const idToken = await data.user.getIdToken();
      const uid = data.user.uid;

      const au = auth.currentUser;
      console.log(au);

      localStorage.clear();
      localStorage.setItem('id', uid);
      localStorage.setItem('token', idToken);
    }).catch((err) => {
      console.log(err);
    });
  }

  return status ? (
    <div className="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center"> 
      <div onClick={()=>setStatus(false)} className="w-full h-full fixed left-0 top-0 z-50 bg-[#00000060]">
      </div>
      <div className="flex flex-col bg-white z-50 rounded-2xl">
        <img className="h-24 object-contain mx-24 my-8" alt='' src="https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-Print-163213010.png"/>
        <div className="m-8">

          <form className="flex flex-col">
            <div className="relative input-text">
              <input type="text" name="email" required/>
              <label>이메일</label>
              <span />
            </div>
            <div className="relative input-text">
              <input type="password" name="password" required/>
              <label>비밀번호</label>
              <span />
            </div>
            <input type="button" className="bg-gray-300 rounded-lg p-1 text-white font-bold mt-4" value={"로그인"}/>
          </form>
          <div className="flex w-full justify-center my-2 text-sm text-gray-400">
            <div>회원가입</div>
            <div className="mx-2">|</div>
            <div>비밀번호 찾기</div>
          </div>
          <div className="flex items-center justify-center w-full my-2">
            <hr className="flex-grow"/>
            <p className="mx-2 text-sm text-gray-400">또는</p>
            <hr className="flex-grow"/>
          </div>
          <div className="w-full text-center bg-white border-2 p-2 rounded-lg" onClick={handleGoogleLogin}>구글로 로그인</div>
        </div>
      </div>
    </div>
  ) : null;
}

export default LoginModal