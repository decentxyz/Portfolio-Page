const NumberTicker = (props:any) => {
  
  function handleChange(e:any) {
    props.setQuantity(e.target.value);
  }

  return (
    <>
      <input className="w-20 p-1 rounded-full text-center text-gray-800 text-lg" min="1" type="number" onChange={handleChange} value={props.quantity} />
    </>
  )
}

export default NumberTicker;