import { useState, useEffect, useRef } from "react"
import api from './api'
import { useSearchParams, useNavigate } from 'react-router-dom';

const Image = ({ url, onRemove }) => {
    return (
        <div className="relative bg-black">
            <div onClick={onRemove} className="absolute right-0 top-0 bg-slate-300 cursor-pointer opacity-50 hover:opacity-100 p-2">删除</div>
            <img src={url} className="aspect-auto w-36" />
        </div>
    )
}



const Textarea = ({ scroll = true, placeholder = "", value, onChange, className = "" }) => {
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.overflow = 'hidden';
        }
    }, [value])
    return (
        <textarea ref={textareaRef} placeholder={placeholder} value={value} className={`outline-none w-full border border-slate-400 rounded-md p-1 resize-none ${className}`} onChange={e => onChange(e.target.value)} />
    )
}

const PromotionEdit = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const promotionId = searchParams.get('promotionId');
    const [text, setText] = useState("");
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        if (promotionId != null) {
            api.getPromotion(promotionId).then(res => {
                const p = res.promotion;
                setText(p.text);
                setImgs(p.imgs);
            })
        }
    }, [])

    const handleUploadFile = async (e) => {
        let file = e.target.files[0];

        if (file) {
            if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
                const res = await api.uploadFile(file);
                console.log(res.data.file);
                if (res.success == true) {
                    setImgs(prev => ([...prev, res.data.file]));
                }
            } else {
                alert('图片格式只能为jpg/png/gif')
            }
        }

    }

    const handleSubmit = async () => {
        let res;
        if (promotionId != null) {
            res = await api.editPromotion(promotionId, text, imgs);
        } else {
            res = await api.createPromotion(text, imgs);
        }
        if (res.success) {
            alert("提交成功")
            navigate("/promotionManage");
        }
    }

    const handleRemoveImg = (idx, event) => {

        setImgs(prev => prev.filter((_, i) => i != idx));
    }



    return (
        <div className="flex-col w-full h-full gap-2">
            <label>
                <div className="text-2xl">编辑推广文案</div>
                <Textarea value={text} onChange={setText} placeholder="输入推广文案"></Textarea>
            </label>

            <div className="flex-col">
                <div className="text-2xl">编辑推广图片</div>
                <div className="gap-2">
                    <div>
                        {imgs.map((url, idx) => (
                            <Image onRemove={handleRemoveImg.bind(null, idx)} key={idx} url={url} />
                        ))}
                    </div>
                    <div className="relative w-36 h-36 cursor-pointer items-center justify-center border border-slate-400 rounded-md" >
                        <input type="file" className="w-full h-full absolute cursor-pointer opacity-0 z-50 bg-black" onChange={handleUploadFile} />
                        <div className="text-2xl">+</div>
                    </div>
                </div>

            </div>
            <div>
                <button onClick={handleSubmit} className="border p-2 text-lg hover:bg-slate-100">提交</button>
            </div>



        </div>



    )
}
export default PromotionEdit;