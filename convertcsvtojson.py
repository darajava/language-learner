import csv
import json

with open('words.csv', 'rb') as csvfile:
    document = csv.reader(csvfile, delimiter=',', quotechar='|')
    
    i = 0    
    jsona = []

    for row in document:
        if i == 0:
          headers = row
          i = i + 1
          continue
        j = 0
        mylist = {}
        
        for word in row:
          mylist[headers[j]] = word
          j = j + 1
        jsona.append(mylist)

    print json.dumps(jsona, indent=True)
            
