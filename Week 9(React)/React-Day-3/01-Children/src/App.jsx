import React from 'react';

const Card = ({ children }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
            {children}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Card>
                <h2>Card Title</h2>
                <p>This is some content inside the card.</p>
            </Card>
            <Card>
                <h2>Another Card</h2>
                <p>This card has different content!</p>
            </Card>
        </div>
    );
};

export default App;

// Collapsible Section
// import React, { useState } from 'react';

// const Collapsible = ({ title, children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div>
//             <button onClick={() => setIsOpen(!isOpen)}>
//                 {title} {isOpen ? '-' : '+'}
//             </button>
//             {isOpen && <div>{children}</div>}
//         </div>
//     );
// };

// const App = () => {
//     return (
//         <div>
//             <Collapsible title="Section 1">
//                 <p>This is the content of section 1.</p>
//             </Collapsible>
//             <Collapsible title="Section 2">
//                 <p>This is the content of section 2.</p>
//             </Collapsible>
//         </div>
//     );
// };

// export default App;

// Modals
// import React, { useState } from 'react';

// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//         }}>
//             <div style={{
//                 background: 'white',
//                 padding: '20px',
//                 borderRadius: '5px',
//             }}>
//                 <button onClick={onClose}>Close</button>
//                 {children}
//             </div>
//         </div>
//     );
// };

// const App = () => {
//     const [isModalOpen, setModalOpen] = useState(false);

//     return (
//         <div>
//             <button onClick={() => setModalOpen(true)}>Open Modal</button>
//             <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
//                 <h2>Modal Title</h2>
//                 <p>This is some content inside the modal.</p>
//             </Modal>
//         </div>
//     );
// };

// export default App;
