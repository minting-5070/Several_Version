export type PaperRecord = {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  link: string;
  abstract: string;
};

export const PASTED_ENTRIES_RAW: string = `
Cui, Z. K., Demirer, M., Jaffe, S., Musolff, L., Peng, S., & Salz, T. (2025). The effects of generative AI on high-skilled work: Evidence from three field experiments with software developers. Available at SSRN 4945566.

This study evaluates the effect of generative AI on software developer productivity via randomized controlled trials at Microsoft, Accenture, and an anonymous Fortune 100 company. These field experiments, run by the companies as part of their ordinary course of business, provided a random subset of developers with access to an AI-based coding assistant suggesting intelligent code completions. Though each experiment is noisy and results vary across experiments, when data is combined across three experiments and 4,867 developers, our analysis reveals a 26.08% increase (SE: 10.3%) in completed tasks among developers using the AI tool. Notably, less experienced developers had higher adoption rates and greater productivity gains.

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566

Sun, S., Li, Z. A., Foo, M. D., Zhou, J., & Lu, J. G. (2025). How and for whom using generative AI affects creativity: A field experiment. Journal of Applied Psychology.

We develop a theoretical perspective on how and for whom large language model (LLM) assistance influences creativity in the workplace. We propose that LLM assistance increases employees’ creativity by providing cognitive job resources. Furthermore, we hypothesize that employees with high levels of metacognitive strategies—who actively monitor and regulate their thinking to achieve goals and solve problems—are more likely to leverage LLM assistance effectively to acquire cognitive job resources, thereby increasing creativity. Our hypotheses were supported by a field experiment, in which we randomly assigned employees in a technology consulting firm to either receive LLM assistance or not. The results are robust across both supervisor and external evaluator ratings of employee creativity. Our findings indicate that LLM assistance enhances employees’ creativity by providing cognitive job resources, especially for employees with high (vs. low) levels of metacognitive strategies. Overall, our field experiment offers novel insights into the mediating and moderating mechanisms linking LLM assistance and employee creativity in the workplace. (PsycInfo Database Record (c) 2025 APA, all rights reserved)

https://psycnet.apa.org/record/2026-29702-001

Song, Y., Yan, T., Jia, F., Chen, L., & Li, H. (2025). Developing Generative AI for Value Co‐Creation: An Intervention‐Based Randomized Field Experiment in a Healthcare Context. Journal of Operations Management.

Owing to limited healthcare resources, there has been increased demand for artificial intelligence (AI) interventions to treat mental health problems of chronic disease patients in developing countries. However, it is challenging to overcome the AI trust crisis in the healthcare context and develop AI that improves the patient's personalized experience and the quality of care. Elaborating on the value co-creation theory using an actor–network theory (ANT) approach, this study examines how generative artificial intelligence (GenAI) can improve post-discharge care for patients with cardiovascular disease in resource-limited settings. Using an intervention-based research approach in collaboration with a major hospital in China, researchers co-designed a GenAI intervention with potential users and various stakeholders. Through a randomized controlled trial, we further evaluated the impact of a co-created GenAI intervention on the post-discharge self-confidence and quality of care of 114 patients. Compared with the standard post-discharge care process, chronically ill patients who received the GenAI intervention experienced a 6.049-point (out of a total of 80 points) decrease in state anxiety and an 87.8% decrease in the 30-day readmission risk. The insights gained from the intervention process, as interpreted using the ANT approach, expand the generic framework of value co-creation to include a more GenAI-mediated network of human and non-human objects. Results reveal GenAI's boundary-spanning and integrating roles as a critical node in the emerging, dynamic, value-creating actor network. The inclusion of “a nonparticipant observe” allows us to offer cognitive explanations for why GenAI works. Overall, this study contributes to healthcare operations management by designing a process for developing and implementing GenAI to improve healthcare operations.

https://onlinelibrary.wiley.com/doi/abs/10.1002/joom.70012

Noy, S., & Zhang, W. (2023). Experimental evidence on the productivity effects of generative artificial intelligence. Science, 381(6654), 187-192.

We examined the productivity effects of a generative artificial intelligence (AI) technology, the assistive chatbot ChatGPT, in the context of midlevel professional writing tasks. In a preregistered online experiment, we assigned occupation-specific, incentivized writing tasks to 453 college-educated professionals and randomly exposed half of them to ChatGPT. Our results show that ChatGPT substantially raised productivity: The average time taken decreased by 40% and output quality rose by 18%. Inequality between workers decreased, and concern and excitement about AI temporarily rose. Workers exposed to ChatGPT during the experiment were 2 times as likely to report using it in their real job 2 weeks after the experiment and 1.6 times as likely 2 months after the experiment.

https://www.science.org/doi/abs/10.1126/science.adh2586

Fang, L., Yuan, Z., Zhang, K., Donati, D., & Sarvary, M. (2025). Generative AI and Firm Productivity: Field Experiments in Online Retail. arXiv preprint arXiv:2510.12049.

We quantify the impact of Generative Artificial Intelligence (GenAI) on firm productivity through a series of large-scale randomized field experiments involving millions of users and products at a leading cross-border online retail platform. Over six months in 2023-2024, GenAI-based enhancements were integrated into seven consumer-facing business workflows. We find that GenAI adoption significantly increases sales, with treatment effects ranging from 0\% to 16.3\%, depending on GenAI's marginal contribution relative to existing firm practices. Because inputs and prices were held constant across experimental arms, these gains map directly into total factor productivity improvements. Across the four GenAI applications with positive effects, the implied annual incremental value is approximately $5 per consumer-an economically meaningful impact given the retailer's scale and the early stage of GenAI adoption. The primary mechanism operates through higher conversion rates, consistent with GenAI reducing frictions in the marketplace and improving consumer experience. We also document substantial heterogeneity: smaller and newer sellers, as well as less experienced consumers, exhibit disproportionately larger gains. Our findings provide novel, large-scale causal evidence on the productivity effects of GenAI in online retail, highlighting both its immediate value and broader potential.

https://arxiv.org/abs/2510.12049

Shan, G., & Qiu, L. (2025). Examining the impact of generative ai on users’ voluntary knowledge contribution: Evidence from a natural experiment on stack overflow. Information Systems Research.

Voluntary knowledge contribution on online platforms holds significant value for users, platforms, and firms. Rapid advancements in generative artificial intelligence (AI) techniques have facilitated the automatic generation of knowledge on question-and-answer (Q&A) platforms. However, the impact of generative AI on users’ voluntary knowledge contributions remains an empirical question. On the one hand, users may learn from generative AI, improving their answers by providing more organized and logical responses. On the other hand, generative AI can produce fabricated answers, and the accelerated pace of responding with AI assistance may impose additional cognitive burdens for comprehending the outputs, potentially reducing overall contributions. Our study examines the effects of generative AI, specifically ChatGPT, on users’ voluntary knowledge contributions on Stack Overflow, one of the largest Q&A platforms. Utilizing a natural experiment, we employ difference-in-differences (DID) estimation to investigate the effects of generative AI on both the quantity and quality of user contributions, measured by the number of answers generated per day, answer length, and readability. Our findings reveal that the use of generative AI correlates with an increased number of answers generated by users, and these answers tend to be shorter in length and easier to read. We further explore the moderating effects of cumulative usage and usage intensity on the impacts of generative AI to test the mechanisms of learning and cognitive load. Our results indicate that users are learning from generative AI, enabling them to answer more questions while producing shorter and more digestible responses. Conversely, the additional cognitive burden associated with intensive AI usage negatively affects its impact on answer quantity. The implications of this study are both theoretical and practical. Theoretically, we contribute to the Information Systems (IS) literature by examining the influence of generative AI on users’ voluntary knowledge contributions within the context of Q&A platforms. Practically, our findings provide platform owners and managers with insights into how generative AI affects users’ knowledge contribution behavior, guiding decision-making and strategic development for integrating generative AI into their platforms.

https://pubsonline.informs.org/doi/abs/10.1287/isre.2023.0332

Su, Y., Zhang, K., Wang, Q., & Qiu, L. (2023). Generative AI and human knowledge sharing: Evidence from a natural experiment. Available at SSRN 4628786.

Generative AI, known for its content creation capabilities, possesses great potential to reshape knowledge-sharing activities. By leveraging a unique policy of a leading online Q&A platform that introduces generative AI answers, we explore the effects of generative AI answers on human contributor participation in knowledge-sharing platforms. Our findings demonstrate the positive effects of the generative AI answers on human contributor participation, both in terms of quantity and length of the subsequent answers to a question. We propose two potential mechanisms: the AI-conformity effect, where users contribute more by learning from generative AI as a credible information source, and the AI-differentiation effect, where users are motivated to provide distinct human perspectives that diverge from AI. Notably, a more nuanced investigation into human-AI answer similarity indicates that generative AI answers prompt users to provide answers more aligned with the AI-generated answers, consistent with the AI-conformity effect rather than the AI-differentiation effect. Our findings reveal that the influence of generative AI answers is more pronounced for objective and under-answered questions, as well as among non-expert contributors compared to expert contributors. In a follow-up randomized experiment, we offer corroborative evidence for the results of empirical analysis and directly test the mechanism. The experimental results indicate that generative AI answers increase participants’ conformity behavior, thereby promoting greater participation, further supporting the AI-conformity effect. Our research highlights the potential of integrating generative AI to motivate human participation in knowledge generation and dissemination, adding to the burgeoning body of work on how generative AI influences human knowledge sharing.

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4628786

Hou, J., Wang, L., Wang, G., Wang, H. J., & Yang, S. (2025). The double-edged roles of generative ai in the creative process: Experiments on design work. Information Systems Research.

Generative artificial intelligence (GenAI) mimics human creativity by producing novel and complex content solutions, which redefine human-AI collaboration across various creative domains. Despite this transformative potential, the existing GenAI literature largely examines creativity as an end product, overlooking the intricate dynamics of the human-GenAI cocreative process. Addressing this gap, our research conceptualizes creativity as a process encompassing two distinct stages: an ideation stage and an implementation stage. Drawing on theories of creativity and expertise fixation, we theorize that GenAI influences the two stages differently, depending on the expertise level of the human creators. Our Study 1 (a laboratory experiment) demonstrates that GenAI tremendously enhances work creativity in the ideation stage by mitigating cognitive fixation for all designers. However, during the implementation stage, the impacts diverge: low-expertise designers with GenAI continue to experience improvements in work creativity, whereas high-expertise designers with GenAI show no gains in their work creativity and suffer a significant reduction in their work efficiency. Further video analyses reveal that expertise fixation underpins these impacts. That is, as GenAI introduces work approaches that deviate from high-expertise designers’ established approaches in implementation, cocreation with GenAI leads to counterproductive outcomes. Building on these findings, Study 2 (a field experiment) further validates the impact of GenAI and the role of expertise fixation among professional designers, and rules out alternative explanations. This study also employs a cutting-edge GenAI model to ensure the robustness of our findings against technological advancements. Our findings provide a nuanced understanding of GenAI’s role in the cocreative process and elucidate its heterogeneous effects based on creators’ expertise levels. This research advances the literature on human-AI collaboration and offers actionable insights for optimizing the use of GenAI in creative work.

https://pubsonline.informs.org/doi/full/10.1287/isre.2024.0937

Zhang, S., & Narayandas, D. (2025). Engaging customers with AI in online chats: evidence from a randomized field experiment. Management Science.

We examine how artificial intelligence (AI) affected the productivity of customer service agents and customer sentiment in online interactions. Collaborating with a meal delivery company, we conducted a randomized field experiment that exploited exogenous variation in giving agents access to AI-generated suggestions. We found that AI improved both the efficiency and effectiveness of the interactions: AI-assisted agents responded faster, engaged customers more deeply, and achieved greater improvements in customer sentiment. The benefits were most pronounced for less-experienced agents. However, AI’s impact varied by conversation type: It improved efficiency and customer sentiment in subscription cancellation requests but was the least effective in repeat complaint scenarios because of systemic issues beyond the AI’s capability. A text analysis of agent messages suggests that improved customer sentiment was explained by AI-assisted agents exhibiting higher levels of key response characteristics: empathy, information, and solution. Furthermore, we exploit a unique data feature: Customers first chatted with an automated chatbot without any human intervention before they were transferred to human agents (who may or may not have had AI assistance). We found that if customers who had experienced chatbot comprehension failures were then connected to AI-assisted human agents, the involvement of AI negatively affected customer sentiment. This is because unusually rapid responses in the latter scenario led customers to believe they were still communicating with a chatbot only, suggesting a spillover from their initial negative chatbot experiences. Companies should understand the conversation contexts, such as customer intent and chatbot interactions, when integrating AI into their customer support strategies.

https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2022.03920

Chen, Z., & Chan, J. (2024). Large language model in creative work: The role of collaboration modality and user expertise. Management Science, 70(12), 9101-9117.

Since the launch of ChatGPT in December 2022, large language models (LLMs) have been rapidly adopted by businesses to assist users in a wide range of open-ended tasks, including creative work. Although the versatility of LLM has unlocked new ways of human-artificial intelligence collaboration, it remains uncertain how LLMs should be used to enhance business outcomes. To examine the effects of human-LLM collaboration on business outcomes, we conducted an experiment where we tasked expert and nonexpert users to write an ad copy with and without the assistance of LLMs. Here, we investigate and compare two ways of working with LLMs: (1) using LLMs as “ghostwriters,” which assume the main role of the content generation task, and (2) using LLMs as “sounding boards” to provide feedback on human-created content. We measure the quality of the ads using the number of clicks generated by the created ads on major social media platforms. Our results show that different collaboration modalities can result in very different outcomes for different user types. Using LLMs as sounding boards enhances the quality of the resultant ad copies for nonexperts. However, using LLMs as ghostwriters did not provide significant benefits and is, in fact, detrimental to expert users. We rely on textual analyses to understand the mechanisms, and we learned that using LLMs as ghostwriters produces an anchoring effect, which leads to lower-quality ads. On the other hand, using LLMs as sounding boards helped nonexperts achieve ad content with low semantic divergence to content produced by experts, thereby closing the gap between the two types of users

https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2023.03014

Hui, X., Reshef, O., & Zhou, L. (2024). The short-term effects of generative artificial intelligence on employment: Evidence from an online labor market. Organization Science, 35(6), 1977-1989.

Generative artificial intelligence (AI) holds the potential to either complement workers by enhancing their productivity or substitute them. We examine the short-term effects of the recently released generative AI models (ChatGPT, DALL-E 2, and Midjourney) on the employment outcomes of freelancers on a large online platform. We find that freelancers in highly affected occupations suffer from the introduction of generative AI, experiencing reductions in both employment and earnings. We find similar effects studying the release of other image-based generative AI models. Exploring the heterogeneity by freelancers’ employment history, we do not find evidence that high-quality service, measured by their past performance and employment, moderates the adverse effects on employment. In fact, we find suggestive evidence that top freelancers are disproportionately affected by AI. These results suggest that generative AI may transform the role of human capital in the organization and reduce overall demand for workers.

https://pubsonline.informs.org/doi/abs/10.1287/orsc.2023.18441

Shan, G., & Qiu, L. (2025). Examining the impact of generative ai on users’ voluntary knowledge contribution: Evidence from a natural experiment on stack overflow. Information Systems Research.

Voluntary knowledge contribution on online platforms holds significant value for users, platforms, and firms. Rapid advancements in generative artificial intelligence (AI) techniques have facilitated the automatic generation of knowledge on question-and-answer (Q&A) platforms. However, the impact of generative AI on users’ voluntary knowledge contributions remains an empirical question. On the one hand, users may learn from generative AI, improving their answers by providing more organized and logical responses. On the other hand, generative AI can produce fabricated answers, and the accelerated pace of responding with AI assistance may impose additional cognitive burdens for comprehending the outputs, potentially reducing overall contributions. Our study examines the effects of generative AI, specifically ChatGPT, on users’ voluntary knowledge contributions on Stack Overflow, one of the largest Q&A platforms. Utilizing a natural experiment, we employ difference-in-differences (DID) estimation to investigate the effects of generative AI on both the quantity and quality of user contributions, measured by the number of answers generated per day, answer length, and readability. Our findings reveal that the use of generative AI correlates with an increased number of answers generated by users, and these answers tend to be shorter in length and easier to read. We further explore the moderating effects of cumulative usage and usage intensity on the impacts of generative AI to test the mechanisms of learning and cognitive load. Our results indicate that users are learning from generative AI, enabling them to answer more questions while producing shorter and more digestible responses. Conversely, the additional cognitive burden associated with intensive AI usage negatively affects its impact on answer quantity. The implications of this study are both theoretical and practical. Theoretically, we contribute to the Information Systems (IS) literature by examining the influence of generative AI on users’ voluntary knowledge contributions within the context of Q&A platforms. Practically, our findings provide platform owners and managers with insights into how generative AI affects users’ knowledge contribution behavior, guiding decision-making and strategic development for integrating generative AI into their platforms.

https://pubsonline.informs.org/doi/10.1287/isre.2023.0332

Hou, J., Wang, L., Wang, G., Wang, H. J., & Yang, S. (2025). The double-edged roles of generative ai in the creative process: Experiments on design work. Information Systems Research.

Generative artificial intelligence (GenAI) mimics human creativity by producing novel and complex content solutions, which redefine human-AI collaboration across various creative domains. Despite this transformative potential, the existing GenAI literature largely examines creativity as an end product, overlooking the intricate dynamics of the human-GenAI cocreative process. Addressing this gap, our research conceptualizes creativity as a process encompassing two distinct stages: an ideation stage and an implementation stage. Drawing on theories of creativity and expertise fixation, we theorize that GenAI influences the two stages differently, depending on the expertise level of the human creators. Our Study 1 (a laboratory experiment) demonstrates that GenAI tremendously enhances work creativity in the ideation stage by mitigating cognitive fixation for all designers. However, during the implementation stage, the impacts diverge: low-expertise designers with GenAI continue to experience improvements in work creativity, whereas high-expertise designers with GenAI show no gains in their work creativity and suffer a significant reduction in their work efficiency. Further video analyses reveal that expertise fixation underpins these impacts. That is, as GenAI introduces work approaches that deviate from high-expertise designers’ established approaches in implementation, cocreation with GenAI leads to counterproductive outcomes. Building on these findings, Study 2 (a field experiment) further validates the impact of GenAI and the role of expertise fixation among professional designers, and rules out alternative explanations. This study also employs a cutting-edge GenAI model to ensure the robustness of our findings against technological advancements. Our findings provide a nuanced understanding of GenAI’s role in the cocreative process and elucidate its heterogeneous effects based on creators’ expertise levels. This research advances the literature on human-AI collaboration and offers actionable insights for optimizing the use of GenAI in creative work.

https://pubsonline.informs.org/doi/10.1287/isre.2024.0937

Yahav, I., Goldstein, A., Geva, T., Meir, S., & Shehory, O. (2025). Quality Control for Crowd Workers and for Language Models: A Framework for Free-Text Response Evaluation with No Ground Truth. Information Systems Research.

In recent years, the field of natural language processing has made remarkable progress with the emergence of large language models (LLMs). In particular, the ability of LLMs to provide fact-based, free-text responses to user queries has the potential to revolutionize domains such as online search and the use of informative chatbots. However, extensive validation is required so that the response accuracy of question-answering LLMs can be confidently trusted. This paper introduces a framework to address this challenge: automated quality evaluation based on textual responses (AQER). The AQER framework focuses on two primary tasks: evaluating the quality of individual workers based on their free-text responses given that no ground-truth data are available and assessing the quality of LLM responses given a set of worker-generated responses. AQER is advantageously intuitive, easy to implement, and flexible to accommodate different components. To evaluate AQER’s effectiveness, we conducted empirical evaluations using semi-synthetic and real-world question-and-answer data sets as well as stress testing through numerical simulations. We also provide analytical motivation and show method convergence and boundary conditions using the probably approximately correct learning framework. The results demonstrate AQER’s robustness in evaluating LLMs and workers, and its superiority over baseline approaches. These findings establish AQER as a benchmark for future research in this field.

https://pubsonline.informs.org/doi/10.1287/isre.2023.0426

Fügener, A., Grahl, J., Gupta, A., & Ketter, W. (2022). Cognitive challenges in human–artificial intelligence collaboration: Investigating the path toward productive delegation. Information Systems Research, 33(2), 678-696.

We study how humans make decisions when they collaborate with an artificial intelligence (AI) in a setting where humans and the AI perform classification tasks. Our experimental results suggest that humans and AI who work together can outperform the AI that outperforms humans when it works on its own. However, the combined performance improves only when the AI delegates work to humans but not when humans delegate work to the AI. The AI’s delegation performance improved even when it delegated to low-performing subjects; by contrast, humans did not delegate well and did not benefit from delegation to the AI. This bad delegation performance cannot be explained with some kind of algorithm aversion. On the contrary, subjects acted rationally in an internally consistent manner by trying to follow a proven delegation strategy and appeared to appreciate the AI support. However, human performance suffered as a result of a lack of metaknowledge—that is, humans were not able to assess their own capabilities correctly, which in turn led to poor delegation decisions. Lacking metaknowledge, in contrast to reluctance to use AI, is an unconscious trait. It fundamentally limits how well human decision makers can collaborate with AI and other algorithms. The results have implications for the future of work, the design of human–AI collaborative environments, and education in the digital age.

https://pubsonline.informs.org/doi/10.1287/isre.2021.1079

Chen, Y., Rui, H., & Whinston, A. B. (2025). Conversation Analytics: Can Machines Read Between the Lines in Real-Time Strategic Conversations?. Information Systems Research, 36(1), 440-455.

Strategic conversations involve one party with an informational advantage and another with an interest in the information. This paper proposes machine learning–based methods to quantify the evasiveness and incoherence of the more-informed party during real-time strategic conversations. To demonstrate the effectiveness of these methods in a real-world setting, we consider the question-and-answer sessions of earnings conference calls, during which managers face scrutinizing questions from analysts. Being reluctant to disclose adverse information, managers may resort to evasive answers and sometimes respond less coherently than they otherwise would. Using data from the earnings calls of S&P 500 companies from 2006 to 2018, we show that the proposed measures predict worse next-quarter earnings. The stock market also perceives incoherence as a negative signal. This paper contributes methodologically to business analytics by developing machine learning methods to extract behavioral cues from real-time strategic conversations. We believe the wide adoption of these tools can increase the efficiency of various markets and institutions where real-time strategic conversations routinely occur, which ultimately benefits business and society.

https://pubsonline.informs.org/doi/10.1287/isre.2022.0415

Lee, K., & Ram, S. (2024). Explainable deep learning for false information identification: An argumentation theory approach. Information Systems Research, 35(2), 890-907.

In today’s world, where online information is proliferating in an unprecedented way, a significant challenge is whether to believe the information we encounter. Ironically, this flood of information provides us with an opportunity to combat false claims by understanding their nature. That is, with the help of machine learning, it is now possible to effectively capture the characteristics of false information by analyzing massive amounts of false claims published online. These methods, however, have neglected the nature of human argumentation, delegating the process of making inferences of the truth to the black box of neural networks. This has created several challenges (namely latent text representations containing entangled syntactic and semantic information, an irrelevant part of text being considered when abstracting text as a latent vector, and counterintuitive model explanation). To resolve these issues, based on Toulmin’s model of argumentation, we propose a computational framework that helps machine learning for false information identification (FII) understand the connection between a claim (whose veracity needs to be verified) and evidence (which contains information to support or refute the claim). Specifically, we first build a word network of a claim and evidence reflecting their syntaxes and convert it into a signed word network using their semantics. The structural balance of this word network is then calculated as a proxy metric to determine the consistency between a claim and evidence. The consistency level is fed into machine learning as input, providing information for verifying claim veracity and explaining the model’s decision making. The two experiments for testing model performance and explainability reveal that our framework shows stronger performance and better explainability, outperforming cutting-edge methods and presenting positive effects on human task performance, trust in algorithms, and confidence in decision making. Our results shed new light on the growing field of automated FII.

https://pubsonline.informs.org/doi/10.1287/isre.2020.0097

Shan, G., & Qiu, L. (2025). Examining the impact of generative ai on users’ voluntary knowledge contribution: Evidence from a natural experiment on stack overflow. Information Systems Research.

Voluntary knowledge contribution on online platforms holds significant value for users, platforms, and firms. Rapid advancements in generative artificial intelligence (AI) techniques have facilitated the automatic generation of knowledge on question-and-answer (Q&A) platforms. However, the impact of generative AI on users’ voluntary knowledge contributions remains an empirical question. On the one hand, users may learn from generative AI, improving their answers by providing more organized and logical responses. On the other hand, generative AI can produce fabricated answers, and the accelerated pace of responding with AI assistance may impose additional cognitive burdens for comprehending the outputs, potentially reducing overall contributions. Our study examines the effects of generative AI, specifically ChatGPT, on users’ voluntary knowledge contributions on Stack Overflow, one of the largest Q&A platforms. Utilizing a natural experiment, we employ difference-in-differences (DID) estimation to investigate the effects of generative AI on both the quantity and quality of user contributions, measured by the number of answers generated per day, answer length, and readability. Our findings reveal that the use of generative AI correlates with an increased number of answers generated by users, and these answers tend to be shorter in length and easier to read. We further explore the moderating effects of cumulative usage and usage intensity on the impacts of generative AI to test the mechanisms of learning and cognitive load. Our results indicate that users are learning from generative AI, enabling them to answer more questions while producing shorter and more digestible responses. Conversely, the additional cognitive burden associated with intensive AI usage negatively affects its impact on answer quantity. The implications of this study are both theoretical and practical. Theoretically, we contribute to the Information Systems (IS) literature by examining the influence of generative AI on users’ voluntary knowledge contributions within the context of Q&A platforms. Practically, our findings provide platform owners and managers with insights into how generative AI affects users’ knowledge contribution behavior, guiding decision-making and strategic development for integrating generative AI into their platforms.

https://pubsonline.informs.org/doi/10.1287/isre.2023.0332

Demirci, O., Hannane, J., & Zhu, X. (2025). Who is AI replacing? The impact of generative AI on online freelancing platforms. Management Science.

This paper studies the impact of generative artificial intelligence (AI) technologies on the demand for online freelancers using a large data set from a leading global freelancing platform. We identify the types of jobs that are more affected by generative AI and quantify the magnitude of the heterogeneous impact. Our findings indicate a 21% decrease in the number of job posts for automation-prone jobs related to writing and coding compared with jobs requiring manual-intensive skills within eight months after the introduction of ChatGPT. We show that the reduction in the number of job posts increases competition among freelancers, whereas the remaining automation-prone jobs are of greater complexity and offer higher pay. We also find that the introduction of image-generating AI technologies led to a 17% decrease in the number of job posts related to image creation. We use Google Trends to show that the more pronounced decline in the demand for freelancers within automation-prone jobs correlates with their higher public awareness of ChatGPT’s substitutability.

https://pubsonline.informs.org/doi/10.1287/mnsc.2024.05420

Zhong, H. (2025). Optimal Integration: Human, Machine, and Generative AI. Management Science.

I study the optimal integration of humans and technologies in multilayered decision-making processes. When each layer can correct existing errors but may also introduce new errors, who should have the final authority? I show that a decision maker’s correction capability normalized by its new errors is a one-dimensional quality metric that determines the optimal rule: deploying higher quality technologies in later stages. Intriguingly, despite its highest quality, the final layer may not generate the greatest error reduction; instead, its role hinges on minimizing new errors. Human effort varies asymmetrically across layers: early stages exert relatively lower effort and prioritize error correction, whereas later stages exert higher effort and focus on avoiding new errors. Applying the model to artificial intelligence (AI) reveals that AI’s generative capabilities make it more likely to serve as the final decision maker, reducing the need for costly human input at the risks of AI hallucination. The theoretical framework also extends to applications including repeated delegation, automation design, loan screening, tenure review, and other multilayer decision-making scenarios.

https://pubsonline.informs.org/doi/10.1287/mnsc.2024.07401

Boussioux, L., Lane, J. N., Zhang, M., Jacimovic, V., & Lakhani, K. R. (2024). The crowdless future? Generative AI and creative problem-solving. Organization Science, 35(5), 1589-1607.

The rapid advances in generative artificial intelligence (AI) open up attractive opportunities for creative problem-solving through human-guided AI partnerships. To explore this potential, we initiated a crowdsourcing challenge focused on sustainable, circular economy business ideas generated by the human crowd (HC) and collaborative human-AI efforts using two alternative forms of solution search. The challenge attracted 125 global solvers from various industries, and we used strategic prompt engineering to generate the human-AI solutions. We recruited 300 external human evaluators to judge a randomized selection of 13 out of 234 solutions, totaling 3,900 evaluator-solution pairs. Our results indicate that while human crowd solutions exhibited higher novelty—both on average and for highly novel outcomes—human-AI solutions demonstrated superior strategic viability, financial and environmental value, and overall quality. Notably, human-AI solutions cocreated through differentiated search, where human-guided prompts instructed the large language model to sequentially generate outputs distinct from previous iterations, outperformed solutions generated through independent search. By incorporating “AI in the loop” into human-centered creative problem-solving, our study demonstrates a scalable, cost-effective approach to augment the early innovation phases and lays the groundwork for investigating how integrating human-AI solution search processes can drive more impactful innovations.

https://pubsonline.informs.org/doi/10.1287/orsc.2023.18430

Schanke, S., Burtch, G., & Ray, G. (2024). Digital lyrebirds: Experimental evidence that voice-based deep fakes influence trust. Management Science.

We consider the pairing of audio chatbot technologies with voice-based deep fakes, that is, voice clones, examining the potential of this combination to induce consumer trust. We report on a set of controlled experiments based on the investment game, evaluating how voice cloning and chatbot disclosure jointly affect participants’ trust, reflected by their willingness to play with an autonomous, AI-enabled partner. We observe evidence that voice-based agents garner significantly greater trust from subjects when imbued with a clone of the subject’s voice. Recognizing that these technologies present not only opportunities but also the potential for misuse, we further consider the moderating impact of AI disclosure, a recent regulatory proposal advocated by some policymakers. We find no evidence that AI disclosure attenuates the trust-inducing effect of voice clones. Finally, we explore underlying mechanisms and contextual moderators for the trust-inducing effects, with an eye toward informing future efforts to manage and regulate voice-cloning applications. We find that a voice clone’s effects operate, at least in part, by inducing a perception of homophily and that the effects are increasing in the clarity and quality of generated audio. Implications of these results for consumers, policymakers, and society are discussed.

https://pubsonline.informs.org/doi/10.1287/mnsc.2022.03316

Tambe, P. B. (2025). Reskilling the Workforce for AI: Domain Expertise and Algorithmic Literacy. Management Science.

This study provides evidence that AI and algorithms act as complements to domain expertise, creating the greatest value when algorithmic literacy is broadly diffused among workers. Unlike earlier business technologies that concentrated expertise in IT specialists, AI and algorithms are most effective when domain experts themselves can interpret and apply them. Using two workforce datasets, I show that demand for algorithmic skills is rising among domain experts, frontier firms diffuse these skills broadly, and markets reward firms’ AI and algorithmic investments more when such capabilities are dispersed. The spread of no-code and natural language tools accelerates this shift by lowering barriers to use and allowing domain experts to integrate algorithms into their decision-making processes. These patterns underscore the importance of workforce training and organizational design in realizing productivity gains from AI adoption.

https://pubsonline.informs.org/doi/10.1287/mnsc.2022.03968

Bockstedt, J. C., & Buckman, J. R. (2025). Humans’ Use of AI Assistance: The Effect of Loss Aversion on Willingness to Delegate Decisions. Management Science.

As artificial intelligence (AI) tools have become pervasive in business applications, so too have interactions between AI and humans in business processes and decision-making. A growing area of research has focused on human decision and task delegation to AI assistants. Simultaneously, extensive research on algorithm aversion—humans’ resistance to algorithm-based decision tools—has demonstrated potential barriers and issues with AI applications in business. In this paper, we test a simple strategy for mitigating algorithm aversion in the context of AI task delegation. We show that simply changing the framing of decision tasks can allay algorithm aversion. Through multiple studies, we found that participants exhibited a strong preference for human assistance over AI assistance when they were rewarded for task performance (i.e., money was gained for good performance), even when the AI had been shown to outperform the human assistant on the task. Alternatively, when we reframed the task such that the participant experienced losses for poor performance (i.e., money was taken from their endowment for poor performance), the bias for preferring human assistance was removed. Under loss framing, participants delegated the decision task to human and AI assistants at similar rates. We demonstrate this finding across tasks at differing levels of complexity and at different incentive sizes. We also provide evidence that loss framing increases situational awareness, which drives the observed effects. Our results offer useful insights on reducing algorithm aversion that extend the literature and provide actionable suggestions for practitioners and managers.

https://pubsonline.informs.org/doi/10.1287/mnsc.2024.05585

Chen, Z., & Chan, J. (2024). Large language model in creative work: The role of collaboration modality and user expertise. Management Science, 70(12), 9101-9117.

Since the launch of ChatGPT in December 2022, large language models (LLMs) have been rapidly adopted by businesses to assist users in a wide range of open-ended tasks, including creative work. Although the versatility of LLM has unlocked new ways of human-artificial intelligence collaboration, it remains uncertain how LLMs should be used to enhance business outcomes. To examine the effects of human-LLM collaboration on business outcomes, we conducted an experiment where we tasked expert and nonexpert users to write an ad copy with and without the assistance of LLMs. Here, we investigate and compare two ways of working with LLMs: (1) using LLMs as “ghostwriters,” which assume the main role of the content generation task, and (2) using LLMs as “sounding boards” to provide feedback on human-created content. We measure the quality of the ads using the number of clicks generated by the created ads on major social media platforms. Our results show that different collaboration modalities can result in very different outcomes for different user types. Using LLMs as sounding boards enhances the quality of the resultant ad copies for nonexperts. However, using LLMs as ghostwriters did not provide significant benefits and is, in fact, detrimental to expert users. We rely on textual analyses to understand the mechanisms, and we learned that using LLMs as ghostwriters produces an anchoring effect, which leads to lower-quality ads. On the other hand, using LLMs as sounding boards helped nonexperts achieve ad content with low semantic divergence to content produced by experts, thereby closing the gap between the two types of users.

https://pubsonline.informs.org/doi/10.1287/mnsc.2023.03014

Yang, C., Bauer, K., Li, X., & Hinz, O. (2025). My Advisor, Her AI, and Me: Evidence from a Field Experiment on Human–AI Collaboration and Investment Decisions. Management Science.

Amid ongoing policy and managerial debates on keeping humans in the loop of artificial intelligence (AI) decision-making processes, we investigate whether human involvement in AI-based service production benefits downstream consumers. Partnering with a large savings bank in Europe, we produced pure AI and human–AI collaborative investment advice, which we passed to the bank customers and investigated the degree of their advice taking in a field experiment. On the production side, contrary to concerns that humans might inefficiently override AI output, our findings show that having a human banker in the loop of AI-based financial advisory by giving her the final say over the advice provided does not compromise the quality of the advice. More importantly, on the consumption side, we find that the bank customers are more likely to align their final investment decisions with advice from the human–AI collaboration, compared with pure AI, especially when facing more risky investments. In our setting, this increased reliance on human–AI collaborative advice leads to higher material welfare for consumers. Additional analyses from the field experiment along with an online controlled experiment indicate that the persuasive efficacy of human–AI collaborative advice cannot be attributed to consumers’ belief in increased advice quality resulting from complementarities between human and AI capabilities. Instead, the consumption-side benefits of human involvement in the AI-based service largely stem from human involvement serving as a peripheral cue that enhances the affective appeal of the advice. Our findings indicate that regulations and guidelines should adopt a consumer-centric approach by fostering environments where human capabilities and AI systems can synergize effectively to benefit consumers while safeguarding consumer welfare. These nuanced insights are crucial for managers who face decisions about offering pure AI versus human–AI collaborative services and also for regulators advocating for having humans in the loop.

https://pubsonline.informs.org/doi/10.1287/mnsc.2022.03918

Kanazawa, K., Kawaguchi, D., Shigeoka, H., & Watanabe, Y. (2025). AI, skill, and productivity: The case of taxi drivers. Management Science.

We examine the impact of artificial intelligence (AI) on productivity in the context of taxi drivers. The AI we study assists drivers with finding customers by suggesting routes along which the demand is predicted to be high. We find that AI improves drivers’ productivity by shortening the cruising time, and this gain is accrued only to low-skilled drivers, narrowing the productivity gap between high- and low-skilled drivers by 13.4%. This case study provides evidence that AI and skill are indeed substitutes, offering direct support for the underlying assumption of recent projection exercises regarding job displacement by AI.

https://pubsonline.informs.org/doi/10.1287/mnsc.2023.01631

Song, Y., Yan, T., Jia, F., Chen, L., & Li, H. (2025). Developing Generative AI for Value Co‐Creation: An Intervention‐Based Randomized Field Experiment in a Healthcare Context. Journal of Operations Management.

Owing to limited healthcare resources, there has been increased demand for artificial intelligence (AI) interventions to treat mental health problems of chronic disease patients in developing countries. However, it is challenging to overcome the AI trust crisis in the healthcare context and develop AI that improves the patient's personalized experience and the quality of care. Elaborating on the value co-creation theory using an actor–network theory (ANT) approach, this study examines how generative artificial intelligence (GenAI) can improve post-discharge care for patients with cardiovascular disease in resource-limited settings. Using an intervention-based research approach in collaboration with a major hospital in China, researchers co-designed a GenAI intervention with potential users and various stakeholders. Through a randomized controlled trial, we further evaluated the impact of a co-created GenAI intervention on the post-discharge self-confidence and quality of care of 114 patients. Compared with the standard post-discharge care process, chronically ill patients who received the GenAI intervention experienced a 6.049-point (out of a total of 80 points) decrease in state anxiety and an 87.8% decrease in the 30-day readmission risk. The insights gained from the intervention process, as interpreted using the ANT approach, expand the generic framework of value co-creation to include a more GenAI-mediated network of human and non-human objects. Results reveal GenAI's boundary-spanning and integrating roles as a critical node in the emerging, dynamic, value-creating actor network. The inclusion of “a nonparticipant observe” allows us to offer cognitive explanations for why GenAI works. Overall, this study contributes to healthcare operations management by designing a process for developing and implementing GenAI to improve healthcare operations.

https://onlinelibrary.wiley.com/doi/10.1002/joom.70012

Chen, Y., Andiappan, M., Jenkin, T., & Ovchinnikov, A. (2023). A manager and an AI walk into a bar: Does ChatGPT make biased decisions like we do?. 1–90.

Problem definition: Large language models (LLMs) are being increasingly leveraged in business and consumer decision-making processes. Because LLMs learn from human data and feedback, which can be biased, determining whether LLMs exhibit human-like behavioral decision biases (e.g., base-rate neglect, risk aversion, confirmation bias, etc.) is crucial prior to implementing LLMs into decision-making contexts and workflows. To understand this, we examine 18 common human biases that are important in operations management (OM) using the dominant LLM, ChatGPT. Methodology/results: We perform experiments where GPT-3.5 and GPT-4 act as participants to test these biases using vignettes adapted from the literature (“standard context”) and variants reframed in inventory and general OM contexts. In almost half of the experiments, Generative Pre-trained Transformer (GPT) mirrors human biases, diverging from prototypical human responses in the remaining experiments. We also observe that GPT models have a notable level of consistency between the standard and OM-specific experiments as well as across temporal versions of the GPT-3.5 model. Our comparative analysis between GPT-3.5 and GPT-4 reveals a dual-edged progression of GPT’s decision making, wherein GPT-4 advances in decision-making accuracy for problems with well-defined mathematical solutions while simultaneously displaying increased behavioral biases for preference-based problems. Managerial implications: First, our results highlight that managers will obtain the greatest benefits from deploying GPT to workflows leveraging established formulas. Second, that GPT displayed a high level of response consistency across the standard, inventory, and non-inventory operational contexts provides optimism that LLMs can offer reliable support even when details of the decision and problem contexts change. Third, although selecting between models, like GPT-3.5 and GPT-4, represents a trade-off in cost and performance, our results suggest that managers should invest in higher-performing models, particularly for solving problems with objective solutions.

https://pubsonline.informs.org/doi/10.1287/msom.2023.0279

Kyung, N., & Kwon, H. E. (2022). Rationally trust, but emotionally? The roles of cognitive and affective trust in laypeople's acceptance of AI for preventive care operations. Production and Operations Management, 10591478231225891.

Artificial intelligence (AI) is transforming healthcare operations. Nevertheless, particularly in the context of preventive care, little is known about how laypeople perceive and accept AI and change their behavior accordingly. Grounded in a solid theoretical framework of trust, this study bridges this gap by exploring individuals’ acceptance of AI-based preventive health interventions and following health behavior change, which is critical for preventive care providers’ operational and business performance. Through a randomized field experiment with 15,000 users of a mobile health app complemented by a survey, we first show that the use and disclosure of AI in preventive health interventions improve their effectiveness. However, individuals are less likely to accept and achieve the health behavior change suggested by AI than when they receive similar interventions from health experts. We also observe that the effectiveness of AI-based interventions can be improved by combining them with human expert opinions, increasing their algorithmic transparency, or emphasizing their genuine care and warmth. These results collectively suggest that, different from conventional technologies, AI's deficient affective trust, rather than comparable cognitive trust, play a decisive role in the acceptance of AI-based preventive health interventions. This study sheds light on the literature on the role of new-age information technologies in behavioral operations management, consumer marketing, and healthcare as well as the role of trust in technology acceptance. Valuable practical implications for more effective management of AI for preventive care operations and promotion of consumers’ health behavior are also provided.

https://onlinelibrary.wiley.com/doi/10.1111/poms.13785

Mithas, S., Chen, Z. L., Saldanha, T. J., & De Oliveira Silveira, A. (2022). How will artificial intelligence and Industry 4.0 emerging technologies transform operations management?. Production and Operations Management, 31(12), 4475-4487.

Emerging technologies such as artificial intelligence, blockchain, additive manufacturing, advanced robotics, autonomous vehicles, and the Internet of Things are frequently mentioned as part of “Industry 4.0.” As such, how will they influence operations and supply chain management? We answer this question by providing a brief review of the evolution of technologies and operations management (OM) over time. Because terms such as “Industry 4.0” do not have a precise definition, we focus on more fundamental issues raised by Industry 4.0 emerging technologies for research in OM. We propose a theory of disruptive debottlenecking and the SACE framework by classifying emerging technologies in terms of the functionalities they enable: sense, analyze, collaborate, and execute. Subsequently, we review the nascent but rapidly growing literature at the interface between digital technologies and OM. Our review suggests that one way to assess the value of Industry 4.0 technologies can be via their influence on adding revenues, differentiating, reducing costs, optimizing risks, innovating, and transforming business models and processes. Finally, we conclude by proposing an agenda for further research.

https://onlinelibrary.wiley.com/doi/10.1111/poms.13864

Dai, T., & Tayur, S. (2022). Designing AI‐augmented healthcare delivery systems for physician buy‐in and patient acceptance. Production and Operations Management, 31(12), 4443-4451.

The role of artificial intelligence (AI) in augmenting healthcare is expected to grow substantially in future decades. Current research in medical AI focuses on developing, validating, and implementing point-level AI applications in an ad hoc manner. To harness the full power of AI to improve the patient experience and outcomes at a societal scale, however, requires a gestalt shift—with a systematic understanding of AI in the context of healthcare—and so results in its widespread adoption. This translates to four pillars of incorporating AI into healthcare workflow, including physician buy-in, patient acceptance, provider investment, and payer support (the “4Ps”). To achieve these 4Ps, it is imperative to design AI-augmented healthcare delivery systems in view of (1) how physicians integrate AI into their clinical practice and (2) how patients perceive the role of AI in healthcare delivery. This will in turn boost provider investment and payer support. In this paper, we draw from the literature to discuss a series of research questions, including barriers to physician buy-in and patient acceptance, transparency and disclosure, service design, and strategies for increasing AI uptake. We shed light on the principles of purposeful design for AI-augmented healthcare delivery systems and propose a research agenda for operations management scholars to consider as they continue to strengthen their engagement with both healthcare professionals and AI developers.

https://onlinelibrary.wiley.com/doi/10.1111/poms.13850

Lu, J. G., Song, L. L., & Zhang, L. D. (2025). Cultural tendencies in generative AI. Nature Human Behaviour, 1-10.

We show that generative artificial intelligence (AI) models—trained on textual data that are inherently cultural—exhibit cultural tendencies when used in different human languages. Here we focus on two foundational constructs in cultural psychology: social orientation and cognitive style. First, we analyse GPT’s responses to a large set of measures in both Chinese and English. When used in Chinese (versus English), GPT exhibits a more interdependent (versus independent) social orientation and a more holistic (versus analytic) cognitive style. Second, we replicate these cultural tendencies in ERNIE, a popular generative AI model in China. Third, we demonstrate the real-world impact of these cultural tendencies. For example, when used in Chinese (versus English), GPT is more likely to recommend advertisements with an interdependent (versus independent) social orientation. Fourth, exploratory analyses suggest that cultural prompts (for example, prompting generative AI to assume the role of a Chinese person) can adjust these cultural tendencies.

https://www.nature.com/articles/s41562-025-02242-1

Doshi, A. R., & Hauser, O. P. (2024). Generative AI enhances individual creativity but reduces the collective diversity of novel content. Science advances, 10(28), eadn5290.

Creativity is core to being human. Generative artificial intelligence (AI)—including powerful large language models (LLMs)—holds promise for humans to be more creative by offering new ideas, or less creative by anchoring on generative AI ideas. We study the causal impact of generative AI ideas on the production of short stories in an online experiment where some writers obtained story ideas from an LLM. We find that access to generative AI ideas causes stories to be evaluated as more creative, better written, and more enjoyable, especially among less creative writers. However, generative AI–enabled stories are more similar to each other than stories by humans alone. These results point to an increase in individual creativity at the risk of losing collective novelty. This dynamic resembles a social dilemma: With generative AI, writers are individually better off, but collectively a narrower scope of novel content is produced. Our results have implications for researchers, policy-makers, and practitioners interested in bolstering creativity.

https://www.science.org/doi/10.1126/sciadv.adn5290

Noy, S., & Zhang, W. (2023). Experimental evidence on the productivity effects of generative artificial intelligence. Science, 381(6654), 187-192.

We examined the productivity effects of a generative artificial intelligence (AI) technology, the assistive chatbot ChatGPT, in the context of midlevel professional writing tasks. In a preregistered online experiment, we assigned occupation-specific, incentivized writing tasks to 453 college-educated professionals and randomly exposed half of them to ChatGPT. Our results show that ChatGPT substantially raised productivity: The average time taken decreased by 40% and output quality rose by 18%. Inequality between workers decreased, and concern and excitement about AI temporarily rose. Workers exposed to ChatGPT during the experiment were 2 times as likely to report using it in their real job 2 weeks after the experiment and 1.6 times as likely 2 months after the experiment.

https://www.science.org/doi/10.1126/science.adh2586

Zhou, E. B., Lee, D., & Gu, B. (2025). Who expands the human creative frontier with generative AI: Hive minds or masterminds?. Science Advances, 11(36), eadu5800.

Artists are rapidly integrating generative text-to-image models into their workflows, yet how this affects creative discovery remains unclear. Leveraging large-scale data from an online art platform, we compare artificial intelligence (AI)–assisted creators to matched nonadopters to assess novel idea contributions. Initially, a concentrated subset of AI-assisted creators contributes more novel artifacts in absolute terms through increased output—the productivity effect—although the average rate of contributing novel artifacts decreases because of a dilution effect. This reflects a shift toward high-volume, incremental exploration, ultimately yielding a greater aggregate of novel artifacts by AI-assisted creators. We observe no evidence of a human-AI effect above and beyond the productivity effect. The release of open-source Stable Diffusion accelerates novel contributions across a more diverse group, suggesting that text-to-image tools facilitate exploration at scale, initially enabling persistent breakthroughs by select “masterminds,” driven by increased volume, and subsequently enabling widespread novel contributions from a “hive mind.”

https://www.science.org/doi/10.1126/sciadv.adu5800

`;

// Normalize various publisher/portal URLs to a canonical key so that
// the same paper (e.g., Wiley abs/full, Science abs/doi) dedupes cleanly.
function canonicalKeyFromLink(link: string, fallbackTitle?: string, fallbackYear?: number): string {
  const safe = (link || '').trim();
  if (!safe) return `${(fallbackTitle || '').toLowerCase()}-${fallbackYear || ''}`.replace(/[^a-z0-9]+/g, '-');
  try {
    const url = new URL(safe);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const path = url.pathname;
    const full = `${host}${path}${url.search}`;

    // Prefer DOI when present anywhere
    const doiMatch = full.match(/10\.\d{4,9}\/[A-Za-z0-9._;()/:\-]+/);
    if (doiMatch) return `doi:${doiMatch[0].toLowerCase()}`;

    // SSRN abstract id
    if (host.includes('ssrn.com')) {
      const id = url.searchParams.get('abstract_id');
      if (id) return `ssrn:${id}`;
    }

    // arXiv id
    if (host.includes('arxiv.org')) {
      const m = path.match(/\/(abs|pdf)\/(\d{4}\.\d{4,5})(v\d+)?/);
      if (m) return `arxiv:${m[2]}`;
    }

    // Nature article id
    if (host.includes('nature.com')) {
      const m = path.match(/\/articles\/([A-Za-z0-9._\-]+)/);
      if (m) return `nature:${m[1].toLowerCase()}`;
    }

    // Fallback to host+clean path
    return full.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  } catch {
    return safe.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}

function parsePastedEntries(raw: string): PaperRecord[] {
	const input = (raw || '').trim();
	if (!input) return [];

	const results: PaperRecord[] = [];
	// Match blocks: citation line(s), abstract chunk, then a line with @URL (or bare URL)
	const re = /(.*?)\n+([\s\S]*?)\n+@?(https?:\/\/\S+)/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(input)) !== null) {
		const citation = (m[1] || '').replace(/\s+/g, ' ').trim();
		const abstract = (m[2] || '').trim();
		const link = (m[3] || '').trim();

		// Parse citation heuristically: Authors (Year). Title. Journal ...
		let authors = '';
		let yearNum = new Date().getFullYear();
		let title = '';
		let journal = '';

		const yearMatch = citation.match(/\((\d{4})\)/);
		if (yearMatch) {
			yearNum = Number(yearMatch[1]);
		}
		const authorsPart = citation.split('(')[0] || '';
		authors = authorsPart.trim().replace(/[\s.]+$/, '');

		let rest = citation.replace(/^.*?\)\.\s*/, ''); // drop up to ") . "
		const firstDot = rest.indexOf('.');
		if (firstDot >= 0) {
			title = rest.slice(0, firstDot).trim();
			rest = rest.slice(firstDot + 1).trim();
		} else {
			title = rest.trim();
			rest = '';
		}
		if (!title) title = citation; // fallback

		// Journal: take the first segment in the remainder before a period or before a volume-like token
		const journalCandidate = rest.split('.')[0] || rest;
		journal = (journalCandidate.split(',')[0] || journalCandidate).trim();
		journal = journal.replace(/[\s.]+$/, '');

    // Stable ID with canonicalization
    const id = canonicalKeyFromLink(link, title, yearNum);

		results.push({
			id,
			title,
			authors,
			year: yearNum,
			journal,
			link,
			abstract,
		});
	}
	return results;
}

// Deduplicate by canonical key
function dedupePapers(list: PaperRecord[]): PaperRecord[] {
  const seen = new Set<string>();
  const out: PaperRecord[] = [];
  for (const p of list) {
    const key = canonicalKeyFromLink(p.link, p.title, p.year);
    if (seen.has(key)) continue;
    seen.add(key);
    // ensure id aligns with canonical key
    out.push({ ...p, id: key });
  }
  return out;
}

const PASTED_PAPERS: PaperRecord[] = dedupePapers(parsePastedEntries(PASTED_ENTRIES_RAW));

// No hard-coded examples; use pasted entries only.
export const PAPERS: PaperRecord[] = [];

export const ALL_PAPERS: PaperRecord[] = [...PAPERS, ...PASTED_PAPERS];

export function searchPapersByQuery(query: string): PaperRecord[] {
  const q = query.toLowerCase();
	return ALL_PAPERS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.journal.toLowerCase().includes(q) ||
      p.abstract.toLowerCase().includes(q)
    );
  });
}

// Lightweight fuzzy ranking for "앵간하면" 매칭을 위함
function tokenize(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean)
    .filter((t) => t.length >= 3);
}

function computeRelevanceScore(query: string, paper: PaperRecord): number {
  const qTokens = new Set(tokenize(query));
  if (qTokens.size === 0) return 0;

  const titleTokens = tokenize(paper.title);
  const authorsTokens = tokenize(paper.authors);
  const journalTokens = tokenize(paper.journal);
  const abstractTokens = tokenize(paper.abstract);

  let overlap = 0;
  let titleOverlap = 0;

  for (const t of qTokens) {
    // exact token overlap
    if (titleTokens.includes(t)) titleOverlap += 1;
    if (titleTokens.includes(t) || authorsTokens.includes(t) || journalTokens.includes(t) || abstractTokens.includes(t)) {
      overlap += 1;
      continue;
    }
    // partial prefix match (3+ chars)
    const prefix = t.slice(0, 4);
    if (!prefix) continue;
    const anyPartial = [titleTokens, authorsTokens, journalTokens, abstractTokens].some(arr => arr.some(tok => tok.startsWith(prefix)));
    if (anyPartial) overlap += 0.5;
  }

  // Weight title hits higher
  const score = overlap + titleOverlap * 0.5;
  // Normalize by query token count to keep within a reasonable range
  return score / Math.max(1, qTokens.size);
}

export function rankPapersByQuery(query: string): PaperRecord[] {
  const scored = ALL_PAPERS.map(p => ({ p, s: computeRelevanceScore(query, p) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.map(x => x.p);
}


