// import { Console } from "node:console";
import { useState,useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { UserContext } from "../../../context/context";

const Model = () => {
    const [user, setuser] = useContext(UserContext).user;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs, setInputs] = useState({
        title: '',
        url:'',
        password:''
    })
    const handelChanged = (e) => {
        const { name, value } = e.target
        setInputs((preve)=>{
            return {
                ...preve,
                [name]: value
            }
        })
        
    }

    const submitForm = () => {
        if (inputs.title !== '' && inputs.url !== '' && inputs.password !== '') {
            fetch('https://peaceful-eyrie-75408.herokuapp.com/uploadImage',
            {
                method: 'POST',
                body: JSON.stringify({
                    title: inputs.title,
                    url: inputs.url,
                    password: inputs.password
                }),
                headers: {
                     "Content-type": "application/json; charset=UTF-8"
                },
                
            }).then((res) => { return res.json() })
            // .then((data) => { null});
            cancelFrom();
        }

        var item = [...user]
        item.unshift(inputs);
        setuser(item)
    }

    const cancelFrom = () => {
        setInputs({
            title: '',
            url: '',
            password: ''
        })
    }
    return (
        <>
            <Button variant="success" onClick={handleShow}>Submit</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Submit Your Image</Modal.Title>
                </Modal.Header>
                <div style={{ margin: '20px' }}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="title" name='title' value={inputs.title} onChange={handelChanged} required />
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="url" name='url' value={inputs.url} onChange={handelChanged} required />
                        <label htmlFor="floatingInput">Image url</label>
                    </div>
                    
                    <div style={{ fontSize: '13px', opacity: '60%' }}>Not Have Image Url? <a href='https://drop-images-to-link.netlify.app/' target="_blank" rel="noreferrer" >Image to url</a></div>
                    <div className="form-floating" style={{ marginTop: '20px' }}>
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={inputs.password} onChange={handelChanged} required />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <Modal.Footer>
                    <p onClick={() => { handleClose(); cancelFrom() }} style={{ marginRight: '10px', cursor: 'pointer', opacity: '80%' }}>cancel</p>
                    <Button variant="success" onClick={() => {
                        submitForm();
                        handleClose();
                    }}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Model
