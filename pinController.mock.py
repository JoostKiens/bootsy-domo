import sys, json

def main():
  for line in sys.stdin:
    parsed_json = json.loads(line)
    if parsed_json['state']:
      print('XIO-P' + str(parsed_json['index']), 'GPIO.HIGH')
    else:
      print('XIO-P' + str(parsed_json['index']), 'GPIO.LOW')

if __name__ == '__main__':
  main()
