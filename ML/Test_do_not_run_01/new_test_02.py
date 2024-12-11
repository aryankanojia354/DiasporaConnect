# import Ollama
from langchain_community.llms.ollama import Ollama


prompt = "What is the colour of the sky?"
model = Ollama(model="smollm:1.7b")
evaluation_results_str = model.invoke(prompt)
evaluation_results_str_cleaned = evaluation_results_str.strip().lower()
print(prompt)
print(evaluation_results_str_cleaned)