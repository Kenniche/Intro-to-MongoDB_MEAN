// 1. Create a database called 'my_first_db'.
    use my_first_db
// 2.Create students collection.
	db.createCollection("students");
// 3. Each document you insert into this collection should have the following format: {name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}}
// 4. Create 5 students with the appropriate info.
	db.students.insert({name: "Harry", home_state:"Hogwarts", lucky_number:7, birthday: {month:7, day:31, year:1980}});
	db.students.insert({name: "Ron", home_state:"Hogwarts", lucky_number:9, birthday: {month:3, day:1, year:1980}});
	db.students.insert({name: "Hermione", home_state:"Washington", lucky_number:3, birthday: {month:9, day:19, year:1979}});
	db.students.insert({name: "Ginny", home_state:"California", lucky_number:7, birthday: {month:8, day:11, year:1981}});
	db.students.insert({name: "Neville", home_state:"Washington", lucky_number:15, birthday: {month:07, day:30, year:1980}});
// 5. Get all students.
	db.students.find()
    db.students.find().pretty() 
// 6. Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
	db.students.find({$or: [{home_state:"California"}, {home_state:"Washington"}]}).pretty()
// 7. Get all students whose lucky number is:
// 7.1 Greater than 3
	db.students.find({lucky_number:{$gt:3}}).pretty()
// 7.2 Less than or equal to 10
	db.students.find({lucky_number:{$lte:10}}).pretty()
// 7.3 Between 1 and 9, inclusive
	db.students.find({ $and: [{lucky_number: {$gte:1}}, {lucky_number: {$lte:9}}]}).pretty()
// 8. Add a field in each student collection called 'interests' that is an ARRAY.  It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
	db.students.update({},{$set: {"interests":['coding', 'brunch', 'MongoDB']}},{multi:true})
// 9. Add some unique interests for each particular students into each of their interest arrays.
    db.students.update({name:"Harry"},{$push:{interests:"Play Quidditch"}});
    db.students.update({name:"Ron"},{$push:{interests:"Eating sweets"}});
    db.students.update({name:"Hermione"},{$push:{interests:"Loved to read and to study"}});
    db.students.update({name:"Ginny"},{$push:{interests:"Loves Quidditch"}});
    db.students.update({name:"Neville"},{$push:{interests:"Herbology"}});
// 10. Add the interest 'taxes' into someone's interest array.
	db.students.update({name: "Ron"},{$push: {interests: "taxes"}})
// 11. Remove the 'taxes' interest you just added.
	db.students.update({name: "Ron"},{$pull: {interests: "taxes"}})
// 12. Remove all students who are from California (or Washington).
    db.students.remove({home_state:"California"})
// 13. Remove a user by name. 
	db.students.remove({name:"Neville"})
// 14. Remove a student whose lucky number is greater than 5 (JUST ONE)
    db.students.remove({lucky_number:{$gt:5}},true);
// 15. Add a field in each student collection called 'number_of_belts' and set it to 0.
	db.students.update({},{$set: {"number_of_belts":0}},{multi:true});
// 16. Increment this field by 1 for all students in Washington (Seattle Dojo).
	db.students.update({home_state: "Washington"},{$inc: {number_of_belts: 1}},{multi:true});
// 17. Rename the 'number_of_belts' field to 'belts_earned'
	db.students.update({}, {$rename: {"number_of_belts":"belts_earned"}});
// 18. Remove the 'lucky_number' field.
	db.students.update({}, {$unset:{lucky_number:""}},{multi:true});
// 19. Add a 'updated_on' field, and set the value as the current date.
    db.students.update({},{$currentDate:{"updated_on":{$type:"date"}}},{multi:true});