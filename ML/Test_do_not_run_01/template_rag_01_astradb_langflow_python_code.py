from langflow.load import run_flow_from_json
TWEAKS = {
  "TextInput-pHXJD": {
    "input_value": "question"
  },
  "Prompt-FxhzC": {},
  "OllamaModel-PdjDf": {},
  "ConditionalRouter-0W3Jm": {},
  "ToolCallingAgent-1ENTR": {},
  "CalculatorTool-mHzMx": {},
  "OllamaModel-7mDkY": {},
  "TextOutput-HwB1E": {},
  "Prompt-j1Gk6": {},
  "TextInput-yVIR3": {
    "input_value": "profile"
  },
  "AstraDB-sDOKi": {},
  "ParseData-IcAYC": {},
  "Prompt-kypWl": {},
  "OllamaModel-jCwSt": {},
  "TextOutput-IuzTf": {}
}

result = run_flow_from_json(flow="AskAI.json",
                            input_value="message",
                            session_id="", # provide a session id if you want to use session state
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)