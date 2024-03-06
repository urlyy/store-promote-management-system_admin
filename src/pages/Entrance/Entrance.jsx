import { useState } from 'react'
import api from './api'
import userStore from '../../stores/user';
import { useNavigate } from 'react-router-dom';


const LoginFrom = ({ onChangeForm }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setUser = userStore(state => state.setUser);
    const submit = async (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            return;
        }
        const res = await api.login(username, password);
        if (res.success) {
            const user = res.data.user;
            const token = res.data.token;
            user.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigate("/");
        } else {
            alert(res.message);
        }

    }
    return (
        <div>
            <form className='gap-1'>
                <div className='justify-center text-2xl'>登录</div>
                <div className='text-xl flex-col'>
                    <div>用户名</div>
                    <input className='border rounded-sm border-black' value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className='text-xl flex-col'>
                    <div>密码</div>
                    <input className='border rounded-sm border-black' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className='gap-1 justify-center'>
                    <button onClick={submit} className='text-xl p-1 text-white bg-primary300 hover:bg-primary200 rounded-md'>提交登录</button>
                    {/* <button onClick={(e) => { e.preventDefault(); onChangeForm('register') }} className='text-xl p-1 border text-white rounded-md bg-accent200 hover:bg-accent100 border-black' >前往注册</button> */}
                </div>
            </form>
        </div>
    )
}

const RegisterForm = ({ onChangeForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            return;
        }
        await api.login();
    }
    return (
        <div>
            <form className='gap-1'>
                <div className='justify-center text-2xl'>注册</div>
                <div className='text-xl flex-col'>
                    <div>用户名</div>
                    <input className='border rounded-sm border-black' value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className='text-xl flex-col'>
                    <div>密码</div>
                    <input className='border rounded-sm border-black' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className='gap-1 justify-center'>
                    <button onClick={submit} className='text-xl p-1 text-white bg-primary300 hover:bg-primary200 rounded-md'>提交注册</button>
                    <button onClick={(e) => { e.preventDefault(); onChangeForm('login') }} className='text-xl p-1 border text-white rounded-md bg-accent200 hover:bg-accent100 border-black' >前往登录</button>
                </div>
            </form>
        </div>
    )
}


const Entrance = () => {
    const [formTitle, setFormTitle] = useState('login');
    const handleChangeForm = (title) => {
        setFormTitle(title);
    }
    return (
        <div className='flex-1 justify-center'>
            {formTitle == "login" && <LoginFrom onChangeForm={handleChangeForm}></LoginFrom>}
            {/* {formTitle == "register" && <RegisterForm onChangeForm={handleChangeForm}></RegisterForm>} */}
        </div>
    )
}
export default Entrance;