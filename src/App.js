import React, {useState, useEffect} from 'react';
import SearchBar from './components/Searchbar'
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Api from 'Services/Api';
import Button from 'components/Button';
import Modal from 'components/Modal';

export default function App() {
  
  const [queryString, setQueryString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState();

  const isVisibleButton = total <= images.length;

  useEffect(() => {
    const options = { queryString, currentPage };
     if (!queryString) {
      return;
     }
    setLoading(true);
   
    if (currentPage === 1) {
      
      Api(options)
        .then(images => {
          toggleLoading();
          setImages(images.hits)
          setTotal(images.total)
        })
        .catch(error => console.log(error));
    } 
  
    if (currentPage > 1) {

      Api(options)
        .then(images => {
          toggleLoading();
          setImages(prevState => (
            [...prevState, ...images.hits]))
        })
        .catch(error => console.log(error));
    };
    
  }, [currentPage, queryString]);


  useEffect(() => { 
    if (currentPage === 1) {
      return;
    } else {
      return window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    }
     
  }, [images, currentPage]);

  const toggleLoading = () => setLoading(false);
  

   const handleKeyDowm = e => {
     if (e.code === 'Escape') {
      setShowModal(false);
      }
  }
      
  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1); 
  } 
  
  const handleFormSubmit = (galleryItem) => {
    setCurrentPage(1);
    setQueryString(galleryItem);
  }
  
  const getBigImage = (largeImage) => {
    toggleModal();
    setLargeImage(largeImage);
  }
        
  const toggleModal = () => {
    setShowModal((prevState => !prevState));
  }
  
  const onClose = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  }
    return (
     
      <div>

        {showModal && <Modal toogleModal={onClose} keyCloseModal={handleKeyDowm }>{largeImage}</Modal>} 
        <SearchBar onSubmit={handleFormSubmit} />
        {images && <ImageGallery images={images} bigImage={getBigImage} />}
        {(!!images.length && !isVisibleButton) && (loading ? <Loader /> : <Button onClick={handleLoadMore} />)}
    
      </div>
    )
  
}