export const getColors = (color) => {

  switch ( color ) {
    case 'purple':
      return {
        bgColor: '#EEE9FF',
        color: '#7751D9',
      }

    case 'blue':
      return {
        bgColor: '#E1F5FF',
        color: '#198FB9',
      }

    case 'green':
      return {
        bgColor: '#DFF3E7',
        color: '#387D4D',
      }

    case 'red':
      return {
        bgColor: '#FFF2F4',
        color: '#D7263D',
      }
  
    default:
      return {
        bgColor: '#fff3cd',
        color: '#ffc107',
      }
  }
}