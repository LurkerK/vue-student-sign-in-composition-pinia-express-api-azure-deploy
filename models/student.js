module.exports = (sequelize, DataTypes) => {
    // define the model
    const Student = sequelize.define('Student', {
        // define the columns in the database - give them a name, and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false,  // column cannot be null
            validate: {
                notEmpty: false // validate that the value is not empty
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,  // column cannot be null 
            unique: true,  // column values must be unique
            validate: {
                notEmpty: false  // validate that the value is not empty
            }
            // todo future = check for aa1234aa 
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,  // column cannot be null 
            default: false  // value is false at default
        }    
    })

    // create or update table in the database
    Student.sync( { force: false } ).then( () => {
        console.log('Synced student table')
    })

    return Student

}