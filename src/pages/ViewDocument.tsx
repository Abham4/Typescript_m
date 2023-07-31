import { CardActionArea, CardContent, Typography } from '@mui/material'
import { Card } from 'react-bootstrap'

const ViewDocument = ({Document}:any) => {
  const links = "https://localhost:5001/"
  return (
    <>
        {
                <Card className='basis-1/2 ' >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Documents
                    </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">
                         fileName
                          </div>
                          <div className="flex flex-col">
                          description
                          </div>   
                        </div>
                        <div className="basis-2/5">
                          <div className="flex flex-col">
                              {Document.fileName.length !== 0?
                                <a href={links+Document.fileName}>{Document.fileName}</a>:<span>---------</span> 
                            } 
                            </div>
                             <div className="flex flex-col">
                               {Document.description.length !== 0?
                                 Document.description:<span>---------</span> }
                            </div>
                        </div>
                      </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            }
    </>
  )
}

export default ViewDocument