function BaseFrame() {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full" style={{ margin: 0, padding: 0 }}>
      <img 
        src="/base.png" 
        alt="Base Frame"
        className="w-full h-auto object-cover"
        style={{
          maxHeight: '200px',
          objectPosition: 'bottom',
          display: 'block',
          margin: 0,
          padding: 0,
          verticalAlign: 'bottom'
        }}
      />
    </div>
  )
}

export default BaseFrame
