export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };