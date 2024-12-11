from langflow.load import run_flow_from_json
from dotenv import load_dotenv

load_dotenv()

profile="50Kg, male, 169cm, not very active"
question="What is the best workout routine for me"

def ask_ai(profile, question):
  TWEAKS = {
    "TextInput-pHXJD": {
      "input_value": question
    },
    "TextInput-yVIR3": {
      "input_value": profile
    },
  }

  result = run_flow_from_json(flow="AskAI.json",
                              input_value="message",
                              # session_id="", # provide a session id if you want to use session state
                              fallback_to_env_vars=True, 
                              tweaks=TWEAKS)

  return result[0].outputs[0].results["text"].data["text"]

ask_ai(profile, question)