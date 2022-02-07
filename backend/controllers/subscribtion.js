const path = require("path");
const validator = require("validator");
const subscrbModel = require(path.join(__dirname, "..", "models", "subscribtion"));
// const providerModel = require(path.join(__dirname, "..", "models", "providers"));


exports.addEmail = async (req, res) => {
    try {

        const {email, checkbox} = req.body;

        // console.log(email, checkbox);



        // check if whether email field is empty or not
        if(email === "") {
            return res.status(400).json({
                success: false,
                error: "Email address is required!"
            })
        }

        // the email is already added
        const isEmailInTheList = await subscrbModel.find({email});

        if(isEmailInTheList.length > 0) {
            return res.status(400).json({
                success: false,
                error: "The email is already in the list!"
            })
        }


        // IS ENDING WITH .CO
        if(isEndingWithCo(email)) {
            return res.status(400).json({
                success: false,
                error: "We are not accepting subscriptions from Colombia emails"
            })
        }

        if(checkbox === "" || checkbox !== true) {
            return res.status(400).json({
                success: false,
                error: "You must accept the terms and conditions!"
            })
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                error: "Please provide a valid e-mail address"
            })
        }

        const emailProvider = handleEmailProviders(email);

        const doc = new subscrbModel({
            email,
            emailProvider
        })

        


       await doc.save(async (err) => {
           if(err) {
               console.log(err);
                return res.status(400).json({
                    success: false,
                    error: 'Bad Request'
                })
           }
          

           return res.status(201).json({
                success: true,
                message: "Congratulations!"
            })

       });


        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

// 11 / 10

// fetch all emails and apply pagination
exports.fetchAllEmails = async(req, res) => {
    try {

        const email_limit_to_show = 10;

        let {page_num} = req.query;

        if(!page_num) {
            page_num = 1;
        }


        const emails = await subscrbModel.find({})
        .limit(email_limit_to_show)
        .skip(email_limit_to_show * (page_num - 1))
        .sort({createdAt: -1})
        .catch(err => {
            return res.status(400).json({
                success: false,
                error: err.message
            })
        })

        return res.status(200).json({
            success: true,
            data: emails
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

// handle pagination
exports.handlePagination = async(req, res) => {
    try {

        const email_limit_to_show = 10;

        const allEmails = await subscrbModel.find({});

        const length = allEmails.length;

        const pagination_nums = Math.ceil(length / email_limit_to_show);

        res.status(200).json({
            success: true,
            data: pagination_nums
        }) 

        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        }) 
    }
}

// filter emails by email provider
exports.filterEmails = async (req, res) => {

    try {

        // const email_limit_to_show = 10;

        const {emailprovider, search, sorting_by_date} = req.query;
        

        let sorting;
        if(sorting_by_date) {
            sorting = -1;
        } else {
            sorting = 1;
        }


        // filter emails

        // 4 types
        // emailprovider=hubspot&search=tutu10@hubspot.com&sorting=-1
        
        if(emailprovider && search && sorting) {
            const doc = await subscrbModel.find({emailProvider : emailprovider, email: search}).sort({createdAt: sorting});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } 
        
        
        
        else if(emailprovider && search) {
            const doc = await subscrbModel.find({emailProvider : emailprovider, email: search});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } 
        
        else if(emailprovider && sorting) {
            const doc = await subscrbModel.find({emailProvider : emailprovider}).sort({createdAt: sorting});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } 

        else if(search && sorting) {
            const doc = await subscrbModel.find({email: search}).sort({createdAt: sorting});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } 
        
        else if(emailprovider) {
            const doc = await subscrbModel.find({emailProvider : emailprovider});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } else if(search) {
            const doc = await subscrbModel.find({email: search});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })

        } else if(sorting) {
            const doc = await subscrbModel.find({}).sort({createdAt: sorting});  

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })
        }

        else {
            const doc = await subscrbModel.find({})

            if(!doc) {
                return res.status(400).json({
                     success: false,
                     error: "Bad Request!"
                 })
             }
     
             return res.status(200).json({
                 success: true,
                 data: doc
             })
        }
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}

// sort email providers 
exports.sortEmailProviders = async (req, res) => {
    try {

        const providerSet = new Set();

        const doc = await subscrbModel.find({})
        .catch(err => res.status(400).json({
            success: false,
            message: "Bad Request!"
        }))
        

        // console.log(doc);

        doc.forEach(({emailProvider}) => {
            providerSet.add(emailProvider);
        })

        return res.status(200).json({
            success: true,
            data: [...providerSet]
        })

        

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

// delete email addresses
exports.deleteEmailAddresses = async(req, res) => {
    try {

        const {id} = req.params;

        // console.log(id);

        await subscrbModel.findOneAndDelete({_id: id})
        .catch(err => res.status(400).json({
            success: false,
            error: err.message
        }))

        res.status(200).json({
            success: true,
            message: "Successfully deleted!"
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


 //  check if whether email ending with co
 const isEndingWithCo = (_email) => {
    const startPosition = (_email.length);
    const amount = (_email.length - 3);

    const isCo = _email.substring(startPosition, amount);

    if(isCo === ".co") {
        return true;
    }

    return false;

}

// handle email providers
const handleEmailProviders = (_email) => {
    const domain = _email.substring(_email.lastIndexOf("@") + 1);

    const emailProvider = domain.substr(0, domain.lastIndexOf("."));

   return emailProvider;
    
}