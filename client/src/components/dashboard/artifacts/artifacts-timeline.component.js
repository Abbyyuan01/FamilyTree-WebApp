// import React from 'react';
// import Carousel, { Modal, ModalGateway } from 'react-images';

// const images = [{ src: 'path/to/image-1.jpg', src: 'path/to/image-2.jpg' }];

// class Timeline extends React.Component {
//   state = { modalIsOpen: false };

//    //load before everything
//    componentDidMount() {
//     axios.get('http://localhost:5000/artifacts/')
//       .then(response => {
//           if (response.data.length > 0) {
//               this.setState({
//                   artifacts: response.data
//               })
//           }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//     }


//   toggleModal = () => {
//     this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
//   };

//   render() {
//     const { modalIsOpen } = this.state;

//     return (
//       <ModalGateway>
//         {modalIsOpen ? (
//           <Modal onClose={this.toggleModal}>
//             <Carousel views={this.state.artifacts} />
//           </Modal>
//         ) : null}
//       </ModalGateway>
//     );
//   }
// }

// export default Timeline;