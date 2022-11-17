import { createContext, useState} from 'react'
import myDATA from '../Data'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [data] = useState(myDATA);
  const [cart,setCart] = useState([]);
  const [price,setPrice] = useState(320);
  const [size,setSize] = useState('');


  // let obj={name:"kAMRAN"}

  return (
    <FeedbackContext.Provider
      value={{
       data,
       price,
       setPrice,
       size,
       setSize,
       cart,
       setCart
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext