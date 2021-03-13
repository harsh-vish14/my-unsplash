
import { useEffect, useContext, useState } from 'react';
import { MdDeleteForever } from 'react-icons/all';
import Masonry from 'react-masonry-css'
import { UserContext } from '../../context/context';
import './main.css'
const Main = () => {
    
    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        992: 3,
        768: 2,
        576: 1,
    };
    
    const [correctPassword, setCorrectPassword] = useState(false);
    const [user, setuser] = useContext(UserContext).user;
    const [password, setPassword] = useState('');
    const fetchingData = async () => {
        await fetch('https://peaceful-eyrie-75408.herokuapp.com/allImages')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setuser(data);
                //
            })
    }
    const handelChanged = (e) => {
        setPassword(e.target.value);
    }
    useEffect(() => {
        fetchingData()
    }, []);
    useEffect(() => {
        elements()
        
    }, [user]);
    

    
    
    const elements = () => {
        return user? (
            user.map((image, i) => {
                if (image) {
                return (
                    <div key={i} id={i} className='image-box' >
                        <img src={image.url} alt={image.title} className='image' style={{ width: '100%', borderRadius: '10px' }} />
                        <div className='title'>
                            {image.title}
                        </div>
                        <div className='delete-btn' onClick={() => deleteIt(i)} data-bs-toggle="modal" data-bs-target={`#Modal${i}`}>
                            <MdDeleteForever className='delete-icon' />
                            <div className='delete-text' >Delete</div>
                        </div>
                        
                        <div className="modal fade" id={`Modal${i}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Enter the password</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                    </div>
                                    <div class="modal-body">
                                        <div className="form-floating" style={{ marginTop: '20px' }}>
                                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' required onChange={handelChanged} value={password} />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        {correctPassword?(<div style={{color: 'red'}}>Invalid Password</div>):(null)}
                                    </div>
                                    <div class="modal-footer">
                                        <div type="button"  data-bs-dismiss="modal" >cancel</div>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { deleteIt(i) }} >Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
               
            }
        })
        ) : (
                <div className='empty' style={{backgroundColor:'transparent'}}>No Images</div>
        )
    }
    

    const deleteIt = (id) => {
        if (password === user[id].password) {
            fetch(`https://peaceful-eyrie-75408.herokuapp.com/images/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
            var newimages = user.filter((image, i) => {
                if (image) {
                    return i != id
                }
            })
            fetchingData()
            setuser(newimages);
            setPassword('')
        } else {
            setCorrectPassword(true)
        }
        fetchingData();
    };
    

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    elements()
                }
            </Masonry>
            
        </div>
    );
};

export default Main;
// export {fetchingData}