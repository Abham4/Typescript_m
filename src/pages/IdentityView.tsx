import { CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Identity } from '../pages/types'

const IdentityView = ({Identity}:any) => {

  return (
    <>
        {
            Identity instanceof Array ?
            Identity.map((idn:Identity)=>(
                <Card className='basis-1/2 ' >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Identity
                    </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">
                          Document Type
                          </div>
                          <div className="flex flex-col">
                          Status
                          </div>
                          <div className="flex flex-col">
                          Description
                          </div>
                        </div>
                        <div className="basis-2/5">
                          <div className="flex flex-col">
                              {idn.documentType.length !== 0?
                                idn.documentType:<span>---------</span> 
                             }
                            </div>
                            <div className="flex flex-col">
                              {idn.status.length !== 0?
                                idn.status:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {idn.description.length !== 0?
                                idn.description:<span>---------</span> }
                            </div>
                        </div>
                      </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              )):
              <></> 
            
            }
    </>
  )
}

export default IdentityView