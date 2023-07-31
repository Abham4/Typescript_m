import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import {Identity} from './types'

const ShowIdentitiy = ({Identity}:any) => {
    // console.log(address)
  return (
    <>
        {
                <Card className='basis-1/2 ' >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     identity
                    </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">
                            Document type
                          </div>
                          <div className="flex flex-col">
                            status
                          </div>
                          <div className="flex flex-col">
                         description
                          </div>
                        </div>
                        <div className="basis-2/5">
                          777
                        </div>
                      </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            
            }
    </>
  )
}

export default ShowIdentitiy