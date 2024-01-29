import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Styled from 'styled-components'
function productslider2() {
  return (
    <>
      <Container>
      {/* cards code */}
        {/* <div className='container'>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis commodi similique ducimus pariatur dolorum 
            ea illum, veniam, fugiat magni inventore consectetur quibusdam id in, repellendus reiciendis ipsa consequuntur beatae. Dicta!</div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">Lorem, ipsum dolor sit amet consectetur adipisicing 
            elit. Est earum, fugit sint quasi totam ipsa officiis, porro aut, adipisci consectetur doloremque ea voluptatibus praesentium neque delectus optio animi itaque eaque!</div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">Lorem ipsum dolor sit amet consectetur, 
            adipisicing elit. Aliquid consequuntur veniam perspiciatis corrupti, placeat optio itaque, officia totam sapiente laboriosam vero fuga! 
            Ipsum aspernatur corporis nemo qui, atque consectetur. A.   </div>
          </div>
        </div>
        <div className='container-fluid'>
          <ul class="nav nav-pills mb-3 ms-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-python-tab" data-bs-toggle="pill" data-bs-target="#pills-python" type="button" role="tab" aria-controls="pills-python" aria-selected="true">PYTHON</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-java-tab" data-bs-toggle="pill" data-bs-target="#pills-java" type="button" role="tab" aria-controls="pills-java" aria-selected="false">JAVA</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-cc-tab" data-bs-toggle="pill" data-bs-target="#pills-cc" type="button" role="tab" aria-controls="pills-cc" aria-selected="false">C++</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-c-tab" data-bs-toggle="pill" data-bs-target="#pills-c" type="button" role="tab" aria-controls="pills-c" aria-selected="false">C</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-react-tab" data-bs-toggle="pill" data-bs-target="#pills-react" type="button" role="tab" aria-controls="pills-react" aria-selected="false">REACT</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-javascript-tab" data-bs-toggle="pill" data-bs-target="#pills-javascript" type="button" role="tab" aria-controls="pills-javascript" aria-selected="false">JAVASCRIPT</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-jquery-tab" data-bs-toggle="pill" data-bs-target="#pills-jquery" type="button" role="tab" aria-controls="pills-jquery" aria-selected="false">JQUERY</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-css-tab" data-bs-toggle="pill" data-bs-target="#pills-css" type="button" role="tab" aria-controls="pills-css" aria-selected="false">CSS</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-html-tab" data-bs-toggle="pill" data-bs-target="#pills-html" type="button" role="tab" aria-controls="pills-html" aria-selected="false">HTML</button>
            </li>
          </ul>
            <div className="tab-content border ms-3 me-3 my-3 mb-5"  id="pills-tabContent">
                <div className="container-fluid pe-5 ps-5 my-3 mb-3 py-4 pb-4 tab-pane fade show active" id="pills-python" role="tabpanel" aria-labelledby="pills-python-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-java" role="tabpanel" aria-labelledby="pills-java-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-cc" role="tabpanel" aria-labelledby="pills-cc-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-c" role="tabpanel" aria-labelledby="pills-c-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-javascript" role="tabpanel" aria-labelledby="pills-javascript-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-jquery" role="tabpanel" aria-labelledby="pills-jquery-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
           
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-react" role="tabpanel" aria-labelledby="pills-react-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
       
           
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-css" role="tabpanel" aria-labelledby="pills-css-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
           
                <div className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade" id="pills-html" role="tabpanel" aria-labelledby="pills-html-tab">
                    <div className="card-group">
                        <div className="card d-flex mr-3 shadow ">
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary" id='bgs' >Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow " >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card d-flex mr-3 shadow" >
                            <img src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695824574/headerimage-98_uscnih.jpg" className="card-img-top" alt="Video Thumbnail" />
                            <video className="card-img-overlay">
                                <source src="your-video.mp4" type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                 </div> 
            </div> 
            </div> */}
        {/* <div class="card text-white w-100 h-100 my- -5" >
          <img class="card-img" src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695806457/mainbanner1_vj9eef.jpg" alt="Card image" />
            <div class="card-img-overlay">
             
            </div>
        </div> */}

        
      </Container>
    </>

  )
}
export default productslider2;

const Container = Styled.div`


`;