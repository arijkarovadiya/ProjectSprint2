#ARIJ KAROVADIYA
#1779053
from configparser import DuplicateOptionError
import mysql.connector
from mysql.connector import Error

import random

import datetime 
from datetime import date

import flask
from flask import jsonify
from flask import request, make_response


#setting up an application name
app  = flask.Flask(__name__) #sets up the applicaiton
app.config["DEBUG"]  = True #allows to show errors in brwser (optional)



def create_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection


def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

def execute_read_query(connection, query):
    cursor = connection.cursor(dictionary=True)
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")



conn = create_connection("projectsprint1.coimvtynkdls.us-east-2.rds.amazonaws.com", "admin", "Arij3368", "cis3368sprint1")

create_user_table = """
CREATE TABLE user(
id INT AUTO_INCREMENT,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);"""
#execute_query(conn,create_user_table)

make_users = """
INSERT INTO user (firstname, lastname) VALUES 
('John', 'Erik'),
('Arij', 'Karovadiya'),
('Hassan', 'Azeem'),
('Ben', 'Tran'),
('Xavier', 'Carter');
"""
#execute_query(conn, make_users)

create_place_table = """
CREATE TABLE restaurants(
id INT AUTO_INCREMENT,
place VARCHAR(255) NOT NULL,
userid INT,
PRIMARY KEY (id),
FOREIGN KEY (userid) REFERENCES user(id)
);"""
#execute_query(conn,create_place_table)

#checking to see if it works
add_restaurants = """
INSERT INTO restaurants (place, userid) VALUES 
('McDonalds', '1'),('Chick-fil-A', '1');
"""
#execute_query(conn,add_restaurants)

add_restaurants2 = """
INSERT INTO restaurants (place, userid) 
VALUES ('El Pollo Loco', '1'),('KFC', '1'),('Pizza Hut', '1'),('Fatburger', '2'),('Sonic', '2'),('Carls Jr.', '2'),('Chili', '2'),('Del Taco', '2');
"""
#execute_query(conn,add_restaurants2)
add_restaurants3 = """
INSERT INTO restaurants (place, userid) 
VALUES ('Whataburger', '3'),('Dominos', '3'),('Burger King', '3'),('Five Guys', '3'),('Burgur House', '3'),
('Panda Express.', '4'),('Popeyes', '4'),('Jack in the Box', '4'),('Wendy', '4'),('Papa Johns', '4'),
('Pei Wei', '5'),('Churchs', '5'),(' In N Out', '5'),('Arby', '5'),('Taco Bell', '5');
"""
#execute_query(conn,add_restaurants3)


print(execute_read_query(conn,"SELECT place,userid FROM restaurants ORDER BY RAND() LIMIT 1;"))

@app.route('/api/adduser', methods=['POST'])
def add_user():
    request_data = request.get_json()
    newfirstname = request_data['firstname']
    newlastname = request_data['lastname']
    newrestaurant1 = request_data['restaurant1']
    newrestaurant2 = request_data['restaurant2']
    newrestaurant3 = request_data['restaurant3']
    newrestaurant4 = request_data['restaurant4']
    newrestaurant5 = request_data['restaurant5']
    queryadd = "INSERT INTO user (firstname, lastname) VALUES ('%s', '%s')" % (newfirstname, newlastname)
    execute_query(conn, queryadd)
    #getid = execute_read_query(conn, "SELECT id FROM user where firstname = '%s' and lastname = '%s'") %(newfirstname, newlastname)
    restaurantadd = "INSERT INTO restaurants (place, userid) VALUES ('%s', LAST_INSERT_ID()),('%s', LAST_INSERT_ID()),('%s', LAST_INSERT_ID()),('%s', LAST_INSERT_ID()),('%s', LAST_INSERT_ID());" % (newrestaurant1, newrestaurant2, newrestaurant3, newrestaurant4,newrestaurant5)
    execute_query(conn, restaurantadd)
    return 'POST WORKED'


@app.route('/api/deleteuser', methods=['POST'])
def delete_user():
    request_data = request.get_json()
    newdeletefirstname = request_data['firstname']
    newdeletelastname = request_data['lastname']
    deletequery1 = "DELETE FROM user WHERE firstname = '%s' and lastname = '%s'" % (newdeletefirstname, newdeletelastname)
    #execute_query(conn, deletequery1)
    return 'POST WORKED'

print(execute_read_query(conn, "select id from user where firstname = 'Chris' and lastname = 'Karov'" ))

@app.route('/api/showuser', methods=['GET'])
def show_users():
    request_data = request.get_json() #don't really need this
    x = execute_read_query(conn, "SELECT * FROM user")
    results = []
    #simple log print function
    for i in x:
        results.append(i)
    print(results)
    return jsonify(results)


@app.route('/api/showrestaurants', methods=['GET'])
def show_restaurants():
    request_data = request.get_json() #don't really need this
    x = execute_read_query(conn, "SELECT * FROM restaurants")
    results = []
    #simple log print function
    for i in x:
        results.append(i)
    print(results)
    return jsonify(results)


app.run()





