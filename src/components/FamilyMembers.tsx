import { CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { family } from '../pages/types'

const FamilyMembers = ({family}:any) => {
  return (
    <>
        {
            family instanceof Array ?
            family.map((fm:family)=>(
                <Card className='basis-1/2 ' >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Family Member
                    </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">
                            First Name
                          </div>
                          <div className="flex flex-col">
                            Middle Name
                          </div>
                          <div className="flex flex-col">
                           Last Name
                          </div>
                          <div className="flex flex-col">
                           Qualifcation
                          </div>
                          <div className="flex flex-col">
                          Phone  Number
                          </div>
                          <div className="flex flex-col">
                          Is Dependent
                          </div>
                          <div className="flex flex-col">
                          Relationship
                          </div>
                          <div className="flex flex-col">
                          Gender
                          </div>
                          <div className="flex flex-col">
                          Marital Status
                          </div>
                          <div className="flex flex-col">
                          Date Of Birth
                          </div>
                        </div>
                        <div className="basis-2/5">
                          <div className="flex flex-col">
                              {fm.firstName.length !== 0?
                                fm.firstName:<span>---------</span>  
                            }
                            </div>
                            <div className="flex flex-col">
                              {fm.middleName.length !== 0?
                                fm.middleName:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {fm.lastName.length !== 0?
                                fm.lastName:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {fm.qualification.length !== 0?
                                fm.qualification:<span>---------</span> }
                            </div>
                            <div className="flex flex-col"> 
                              {fm.phoneNumber.length !== 0?
                                fm.phoneNumber:<span>-</span>}
                            </div>
                            <div className="flex flex-col">
                              {fm.isDepandant.toString() }
                            </div>
                            <div className="flex flex-col">
                              {fm.relationShip.length !== 0?
                                fm.relationShip:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {fm.gender.length !== 0?
                                fm.gender:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {fm.maritalStatus.length !== 0?
                                fm.maritalStatus:<span>---------</span> }
                            </div>
                            <div className="flex flex-col">
                              {fm.dob.length !== 0?
                                fm.dob:<span>---------</span> }
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

export default FamilyMembers