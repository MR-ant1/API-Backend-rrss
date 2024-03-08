
export const register = (req, res) => {
    try {
       res.status(201).json(
      {
        success: true,
        message: "Register user successfully"
      }
    ) 
    } catch (error) {
        handleError(res, "cant register users", 500)
    }
    
}

export const login = (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Login user successfully"
    }
  )
}