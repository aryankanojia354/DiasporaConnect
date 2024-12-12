# fetch from mongodb and make into csv
import csv
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB connection string
db = client['your_database_name']  # Replace with your database name
collection = db['your_collection_name']  # Replace with your collection name

# Fetch data from MongoDB
data = collection.find()

# Specify the output CSV file name
csv_file = 'output.csv'

# Convert MongoDB data to CSV
def convert_to_csv(data, file_name):
    with open(file_name, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)

        # Write the headers
        headers = [
            '_id', 'userId', 'cartId', 'cartItems', 'addressInfo', 'orderStatus',
            'paymentMethod', 'paymentStatus', 'totalAmount', 'orderDate',
            'orderUpdateDate', 'paymentId', 'payerId', '__v'
        ]
        writer.writerow(headers)

        # Write each document to the CSV file
        for document in data:
            row = [
                str(document.get('_id', '')),
                document.get('userId', ''),
                document.get('cartId', ''),
                str(document.get('cartItems', '')),
                str(document.get('addressInfo', '')),
                document.get('orderStatus', ''),
                document.get('paymentMethod', ''),
                document.get('paymentStatus', ''),
                document.get('totalAmount', {}).get('$numberDouble', ''),
                document.get('orderDate', {}).get('$date', {}).get('$numberLong', ''),
                document.get('orderUpdateDate', {}).get('$date', {}).get('$numberLong', ''),
                document.get('paymentId', ''),
                document.get('payerId', ''),
                document.get('__v', {}).get('$numberInt', '')
            ]
            writer.writerow(row)

convert_to_csv(data, csv_file)

print(f"Data has been exported to {csv_file}")
