--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    date_created timestamp without time zone NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying NOT NULL,
    date_created timestamp without time zone NOT NULL,
    is_answer boolean NOT NULL,
    author_id integer,
    question_id integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    title character varying NOT NULL,
    user_id integer,
    question_id integer
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    date_created timestamp without time zone NOT NULL,
    views integer NOT NULL,
    author_id integer
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: tag_question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag_question (
    tag_id integer NOT NULL,
    question_id integer NOT NULL
);


ALTER TABLE public.tag_question OWNER TO postgres;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    date_created timestamp without time zone NOT NULL,
    profile_image character varying NOT NULL,
    role_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_dislike_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_dislike_article (
    user_id integer NOT NULL,
    article_id integer NOT NULL
);


ALTER TABLE public.users_dislike_article OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_like_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_like_article (
    user_id integer NOT NULL,
    article_id integer NOT NULL
);


ALTER TABLE public.users_like_article OWNER TO postgres;

--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, content, date_created) FROM stdin;
1	Researchers are developing a new technology that uses hand gestures to carry out commands on computers.	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The prototype, called "Typealike," works through a regular laptop webcam with a simple affixed mirror. The program recognizes the user's hands beside or near the keyboard and prompts operations based on different hand positions.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">A user could, for example, place their right hand with the thumb pointing up beside the keyboard, and the program would recognize this as a signal to increase the volume. Different gestures and different combinations of gestures can be programmed to carry out a wide range of operations.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The innovation in the field of human-computer interaction aims to make user experience faster and smoother, with less need for keyboard shortcuts or working with a mouse and trackpad.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"It started with a simple idea about new ways to use a webcam," said Nalin Chhibber, a recent master's graduate from the University of Waterloo's Cheriton School of Computer Science. "The webcam is pointed at your face, but the most interaction happening on a computer is around your hands. So we thought, what could we do if the webcam could pick up hand gestures?"</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The initial insight led to the development of a small mechanical attachment that redirects the webcam downwards towards the hands. The team then created a software program capable of understanding distinct hand gestures in variable conditions and for different users. The team used machine learning techniques to train the Typealike program.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"It's a neural network, so you need to show the algorithm examples of what you're trying to detect," said Fabrice Matulic, senior researcher at Preferred Networks Inc. and a former postdoctoral researcher at Waterloo. "Some people will make gestures a little bit differently, and hands vary in size, so you have to collect a lot of data from different people with different lighting conditions."</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The team recorded a database of hand gestures with dozens of research volunteers. They also had the volunteers do tests and surveys to help the team understand how to make the program as functional and versatile as possible.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"We're always setting out to make things people can easily use," said Daniel Vogel, an associate professor of computer science at Waterloo. "People look at something like Typealike, or other new tech in the field of human-computer interaction, and they say it just makes sense. That's what we want. We want to make technology that's intuitive and straightforward, but sometimes to do that takes a lot of complex research and sophisticated software."</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The researchers say there are further applications for the Typealike program in virtual reality where it could eliminate the need for hand-held controllers.</span>&nbsp;&nbsp;</p>\n	2022-01-11 15:50:16.973716
2	Machine learning models quantum devices	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Quantum computers make headlines in the scientific press, but these machines are considered by most experts to still be in their infancy. A quantum internet, however, may be a little closer to the present. This would offer significant security advantages over our current internet, amongst other things. But even this will rely on technologies that have yet to see the light of day outside the lab. While many fundamentals of the devices that can create our quantum internet may have been worked out, there are many engineering challenges in order to realize these as products. But much research is underway to create tools for the design of quantum devices.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Postdoctoral researcher Quoc Hoan Tran and Associate Professor Kohei Nakajima from the Graduate School of Information Science and Technology at the University of Tokyo have pioneered just such a tool, which they think could make verifying the behavior of quantum devices a more efficient and precise undertaking than it is at present. Their contribution is an algorithm that can reconstruct the workings of a time-dependent quantum device by simply learning the relationship between the quantum inputs and outputs. This approach is actually commonplace when exploring a classical physical system, but quantum information is generally tricky to store, which usually makes it impossible.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"The technique to describe a quantum system based on its inputs and outputs is called quantum process tomography" </span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">said Tran. </span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"However, many researchers now report that their quantum systems exhibit some kind of memory effect where present states are affected by previous ones. This means that a simple inspection of input and output states cannot describe the time-dependent nature of the system. You could model the system repeatedly after every change in time, but this would be extremely computationally inefficient. Our aim was to embrace this memory effect and use it to our advantage rather than use brute force to overcome it."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Tran and Nakajima turned to machine learning and a technique called quantum reservoir computing to build their novel algorithm. This learns patterns of inputs and outputs that change over time in a quantum system and effectively guesses how these patterns will change, even in situations the algorithm has not yet witnessed. As it does not need to know the inner workings of a quantum system as a more empirical method might, but only the inputs and outputs, the team's algorithm can be simpler and produce results faster as well.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"At present, our algorithm can emulate a certain kind of quantum system, but hypothetical devices may vary widely in their processing ability and have different memory effects. So the next stage of research will be to broaden the capabilities of our algorithms, essentially making something more general purpose and thus more useful," said Tran. "I am excited by what quantum machine learning methods could do, by the hypothetical devices they might lead to."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">This work is supported by MEXT Quantum Leap Flagship Program (MEXT Q-LEAP) Grant</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Nos. JPMXS0118067394 and JPMXS0120319794.</span>&nbsp;&nbsp;</p>\n	2022-01-11 15:54:11.160588
3	Mind-controlled robots now one step closer	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Tetraplegic patients are prisoners of their own bodies, unable to speak or perform the slightest movement. Researchers have been working for years to develop systems that can help these patients carry out some tasks on their own. "People with a spinal cord injury often experience permanent neurological deficits and severe motor disabilities that prevent them from performing even the simplest tasks, such as grasping an object," says Prof. Aude Billard, the head of EPFL's Learning Algorithms and Systems Laboratory. "Assistance from robots could help these people recover some of their lost dexterity, since the robot can execute tasks in their place."</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Prof. Billard carried out a study with Prof. Jos├й del R. Mill├бn, who at the time was the head of EPFL's Brain-Machine Interface laboratory but has since moved to the University of Texas. The two research groups have developed a computer program that can control a robot using electrical signals emitted by a patient's brain. No voice control or touch function is needed; patients can move the robot simply with their thoughts. The study has been published in</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>Communications Biology</em>, an open-access journal from Nature Portfolio.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Avoiding obstacles</strong></span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">To develop their system, the researchers started with a robotic arm that had been developed several years ago. This arm can move back and forth from right to left, reposition objects in front of it and get around objects in its path. "In our study we programmed a robot to avoid obstacles, but we could have selected any other kind of task, like filling a glass of water or pushing or pulling an object," says Prof. Billard.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The engineers began by improving the robot's mechanism for avoiding obstacles so that it would be more precise. "At first, the robot would choose a path that was too wide for some obstacles, taking it too far away, and not wide enough for others, keeping it too close," says Carolina Gaspar Pinto Ramos Correia, a PhD student at Prof. Billard's lab. "Since the goal of our robot was to help paralyzed patients, we had to find a way for users to be able to communicate with it that didn't require speaking or moving."</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>An algorithm that can learn from thoughts</strong></span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">This entailed developing an algorithm that could adjust the robot's movements based only on a patient's thoughts. The algorithm was connected to a headcap equipped with electrodes for running electroencephalogram (EEG) scans of a patient's brain activity. To use the system, all the patient needs to do is look at the robot. If the robot makes an incorrect move, the patient's brain will emit an "error message" through a clearly identifiable signal, as if the patient is saying "No, not like that." The robot will then understand that what it's doing is wrong -- but at first it won't know exactly why. For instance, did it get too close to, or too far away from, the object? To help the robot find the right answer, the error message is fed into the algorithm, which uses an inverse reinforcement learning approach to work out what the patient wants and what actions the robot needs to take. This is done through a trial-and-error process whereby the robot tries out different movements to see which one is correct. The process goes pretty quickly -- only three to five attempts are usually needed for the robot to figure out the right response and execute the patient's wishes. "The robot's AI program can learn rapidly, but you have to tell it when it makes a mistake so that it can correct its behavior," says Prof. Mill├бn. "Developing the detection technology for error signals was one of the biggest technical challenges we faced." Iason Batzianoulis, the study's lead author, adds: "What was particularly difficult in our study was linking a patient's brain activity to the robot's control system -- or in other words, 'translating' a patient's brain signals into actions performed by the robot. We did that by using machine learning to link a given brain signal to a specific task. Then we associated the tasks with individual robot controls so that the robot does what the patient has in mind."</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Next step: a mind-controlled wheelchair</strong></span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The researchers hope to eventually use their algorithm to control wheelchairs. "For now there are still a lot of engineering hurdles to overcome," says Prof. Billard. "And wheelchairs pose an entirely new set of challenges, since both the patient and the robot are in motion." The team also plans to use their algorithm with a robot that can read several different kinds of signals and coordinate data received from the brain with those from visual motor functions.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Explore the</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>latest scientific research on sleep and dreams</strong></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">in this free online course from</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>New Scientist</em></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">тАФ</span> <a href="https://academy.newscientist.com/courses/science-of-sleep-and-dreams#utm_medium=nsaca_native-ad&utm_campaign=nsaca_science-daily_free-sleep-course_0122" target="_self"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Sign up now &gt;&gt;&gt;</span></a></p>\n<p><a href="https://academy.newscientist.com/courses/science-of-sleep-and-dreams#utm_source=sciencedaily&utm_medium=nsaca_native-ad&utm_campaign=nsaca_science-daily_free-sleep-course_0122" target="_self"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">academy.newscientist.com/courses/science-of-sleep-and-dreams</span></a>&nbsp;&nbsp;</p>\n	2022-01-11 15:56:39.738282
4	How to transform vacancies into quantum information	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"Vacancy" is a sign you want to see when searching for a hotel room on a road trip. When it comes to quantum materials, vacancies are also something you want to see. Scientists create them by removing atoms in crystalline materials. Such vacancies can serve as quantum bits or qubits, the basic unit of quantum technology.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Researchers at the U.S. Department of Energy's (DOE) Argonne National Laboratory and the University of Chicago have made a breakthrough that should help pave the way for greatly improved control over the formation of vacancies in silicon carbide, a semiconductor.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Semiconductors are the material behind the brains in cell phones, computers, medical equipment and more. For those applications, the existence of atomic-scale defects in the form of vacancies is undesirable, as they can interfere with performance. According to recent studies, however, certain types of vacancies in silicon carbide and other semiconductors show promise for the realization of qubits in quantum devices. Applications of qubits could include unhackable communication networks and hypersensitive sensors able to detect individual molecules or cells. Also possible in the future are new types of computers able to solve complex problems beyond the reach of classical computers.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"Scientists already know how to produce qubit-worthy vacancies in semiconductors such as silicon carbide and diamond," said Giulia Galli, a senior scientist at Argonne's Materials Science Division and professor of molecular engineering and chemistry at the University of Chicago. ?"But for practical new quantum applications, they still need to know much more about how to customize these vacancies with desired features."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">In silicon carbide semiconductors, single vacancies occur upon the removal of individual silicon and carbon atoms in the crystal lattice. Importantly, a carbon vacancy can pair with an adjacent silicon vacancy. This paired vacancy, called a divacancy, is a key candidate as a qubit in silicon carbide. The problem has been that the yield for converting single vacancies into divacancies has been low, a few percent. Scientists are racing to develop a pathway to increase that yield.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"To create actual defects in a sample, you shoot a beam of high-velocity electrons at it, and this knocks out individual atoms," explained Elizabeth Lee, a postdoctoral researcher in the UChicago Pritzker School of Molecular Engineering. ?"But that electron bombardment also creates unwanted defects."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Scientists can heal those defects by subsequently treating the sample at very high temperatures, above 1,300 degrees Fahrenheit, and cooling it down again to room temperature. The trick is to develop a process that will keep the wanted defects and heal the unwanted ones.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"By performing computer simulations at the atomic scale with high-performance computers, we can watch defects forming, moving, disappearing and rotating in a sample over time at different temperatures," said Lee. ?"This is something that cannot be done experimentally, at present."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Aided by a combination of sophisticated computational tools, the team's simulations tracked the pairing of individual vacancies into a divacancy. Their efforts reaped a harvest of pivotal discoveries that should pave the way for new quantum devices. One is that the more silicon vacancies there are relative to carbon vacancies at the start of heat treatment, the more divacancies afterwards. Another is the determination of the best temperatures for creating stable divacancies and for altering their orientation within the crystal structure without destroying them.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Scientists may be able to use the latter discovery for aligning the orientation of all the divacancies in the same direction. That would be highly desirable for sensing applications able to operate with many times the resolution of today's sensors.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><code>"A totally unexpected and exciting finding was that divacancies can convert into an entirely new type of defect,"</code> added Lee. These newly discovered defects consist of two carbon vacancies paired with what scientists call an anti-site. That is a site in which a carbon atom has filled the vacancy left open by the removal of a silicon atom.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">A first of its kind, the team's simulations were made possible by the development of new simulation algorithms and the coupling of computer codes developed by the DOE-funded Midwest Integrated Center for Computational Materials (MICCoM), headquartered at Argonne and led by Galli. Juan de Pablo a senior scientist in the Materials Science Division and UChicago professor of molecular engineering, developed the new algorithms, which are based on concepts from machine learning, a form of artificial intelligence.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"The formation and the motion of vacancies or defects in semiconductors are what we call rare events," said de Pablo. ?"Such events happen on time scales much too long to study in conventional molecular simulations, even on the fastest computer on the planet. It is critical that we develop new ways of promoting the occurrence of these events without altering the underlying physics. That's what our algorithms do; they make the impossible possible."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Lee coupled the various codes, building on the work of MICCoM scientists Galli and de Pablo. Over the years, several other scientists were also involved in code coupling, including Francois Gygi at the University of California, Davis, and Jonathan Whitmer at Notre Dame University. The outcome is an important and powerful new toolset combining quantum theory and simulations for investigating vacancy formation and behavior. This will be applicable to not only silicon carbide, but other promising quantum materials.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"We are just at the beginning," said Galli. ?"We want to be able to do our computations much faster, simulate many more defects and determine what the best defects are for different applications."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Video on simulating changes within atomic structures:</span> <a href="https://www.youtube.com/watch?v=KZIyG9II514" target="_self"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">https://www.youtube.com/watch?v=KZIyG9II514</span></a>&nbsp;&nbsp;</p>\n	2022-01-11 15:58:59.544795
5	LightтАУmatter interactions simulated on the worldтАЩs fastest supercomputer	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">In a study published this month in</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>The</em></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>International Journal of High Performance Computing Applications</em>, a research team led by the University of Tsukuba describes a highly efficient method for simulating light-matter interactions at the atomic scale.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">What makes these interactions so difficult to simulate? One reason is that phenomena associated with the interactions encompass many areas of physics, involving both the propagation of light waves and the dynamics of electrons and ions in matter. Another reason is that such phenomena can cover a wide range of length and time scales.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Given the multiphysics and multiscale nature of the problem, light-matter interactions are typically modeled using two separate computational methods. The first is electromagnetic analysis, whereby the electromagnetic fields of the light are studied; the second is a quantum-mechanical calculation of the optical properties of the matter. But these methods assume that the electromagnetic fields are weak and that there is a difference in the length scale.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"Our approach provides a unified and improved way to simulate light-matter interactions," says senior author of the study Professor Kazuhiro Yabana. "We achieve this feat by simultaneously solving three key physics equations: the Maxwell equation for the electromagnetic fields, the time-dependent Kohn-Sham equation for the electrons, and the Newton equation for the ions."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The researchers implemented the method in their in-house software SALMON (Scalable Ab initio Light-Matter simulator for Optics and Nanoscience), and they thoroughly optimized the simulation computer code to maximize its performance. They then tested the code by modeling light-matter interactions in a thin film of amorphous silicon dioxide, composed of more than 10,000 atoms. This simulation was carried out using almost 28,000 nodes of the fastest supercomputer in the world, Fugaku, at the RIKEN Center for Computational Science in Kobe, Japan.</span></p>\n<blockquote><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">"We found that our code is extremely efficient, achieving the goal of one second per time step of the calculation that is needed for practical applications," says Professor Yabana. "The performance is close to its maximum possible value, set by the bandwidth of the computer memory, and the code has the desirable property of excellent weak scalability."</span></blockquote>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Although the team simulated light-matter interactions in a thin film in this work, their approach could be used to explore many phenomena in nanoscale optics and photonics.</span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Story Source:</strong></span></p>\n<p><a href="https://www.tsukuba.ac.jp/en/research-news/20220106140000.html" target="_blank"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Materials</span></a> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">provided by</span> <a href="https://www.tsukuba.ac.jp/en" target="_blank"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>University of Tsukuba</strong></span></a><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">.</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>Note: Content may be edited for style and length.</em></span></p>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Journal Reference</strong>:</span></p>\n<ol>\n<li><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Yuta Hirokawa, Atsushi Yamada, Shunsuke Yamada, Masashi Noda, Mitsuharu Uemoto, Taisuke Boku, Kazuhiro Yabana.</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Large-scale ab initio simulation of lightтАУmatter interaction at the atomic scale in Fugaku</strong>.</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><em>The International Journal of High Performance Computing Applications</em>, 2022; 109434202110657 DOI:</span> <a href="http://dx.doi.org/10.1177/10943420211065723" target="_blank"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">10.1177/10943420211065723</span></a>&nbsp;&nbsp;</li>\n</ol>\n	2022-01-11 16:01:24.048729
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, date_created, is_answer, author_id, question_id) FROM stdin;
1	<p>As I like to say:</p>\n<blockquote>Hello to everybody! It is nice to meet you!</blockquote>\n<p>Have a nice day!</p>\n	2022-01-11 14:59:37.995751	f	2	1
4	<h1>Wow, this is a very cool website!</h1>\n	2022-01-11 15:21:15.900071	f	3	1
2	<h1><a href="http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.dt.round.html" target="_self"><span style="color: var(--theme-link-color);font-size: 27px;font-family: inherit;"><strong>dt.round</strong></span></a></h1>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">This is how it should be done... use</span> <a href="http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.dt.round.html" target="_self"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><ins>dt.round</ins></span></a></p>\n<pre><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">df.assign(Date=df.Date.dt.round('H'))<br><br>                 Date       Num<br>0 2011-01-01 00:00:00       0.577957<br>1 2011-01-01 01:00:00       0.995748<br>2 2011-01-01 02:00:00       0.864013<br>3 2011-01-01 03:00:00       0.468762<br>4 2011-01-01 04:00:00       0.866827</span></pre>\n<p style="text-align:left;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong><em>OLD ANSWER</em></strong></span></p>\n<p style="text-align:left;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">One approach is to set the index and use</span> <span style="background-color: transparent;"><code>resample</code></span>&nbsp;</p>\n<pre>df.set_index('Date').resample('H').last().reset_index()<br><br>                 Date       Num<br>0 2011-01-01 00:00:00       0.577957<br>1 2011-01-01 01:00:00       0.995748<br>2 2011-01-01 02:00:00       0.864013<br>3 2011-01-01 03:00:00       0.468762<br>4 2011-01-01 04:00:00       0.866827</pre>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Another alternative is to strip the</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><code>date</code></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">and</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><code>hour</code></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">components</span>&nbsp;&nbsp;</p>\n<pre>df.assign(<br>    Date=pd.to_datetime(df.Date.dt.date) +<br>         pd.to_timedelta(df.Date.dt.hour, unit='H'))<br><br>                 Date       Num<br>0 2011-01-01 00:00:00       0.577957<br>1 2011-01-01 01:00:00       0.995748<br>2 2011-01-01 02:00:00       0.864013<br>3 2011-01-01 03:00:00       0.468762<br>4 2011-01-01 04:00:00       0.866827&nbsp;</pre>\n	2022-01-11 15:12:10.763026	t	3	2
5	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Other solution could be this:</span></p>\n<pre>df.Date = pd.to_datetime(df.Date)<br>df.Date = df.Date.apply(lambda x: datetime(x.year, x.month, x.day, x.hour))</pre>\n	2022-01-11 15:24:28.937969	f	4	2
9	<p>Greetings from The President of Ukraine!ЁЯЦЦ</p>\n	2022-01-11 15:41:23.672306	f	5	1
6	<h2>Shortcut to understanding <code>yield</code></h2>\n<p>When you see a function with <code>yield</code> statements, apply this easy trick to understand what will happen:</p>\n<ol>\n<li>Insert a line <code>result = []</code> at the start of the function.</li>\n<li>Replace each <code>yield expr</code> with <code>result.append(expr)</code>.</li>\n<li>Insert a line <code>return result</code> at the bottom of the function.</li>\n<li>Yay - no more <code>yield</code> statements! Read and figure out code.</li>\n<li>Compare function to the original definition.</li>\n</ol>\n<blockquote>This trick may give you an idea of the logic behind the function, but what actually happens with <code>yield</code> is significantly different than what happens in the list based approach. In many cases, the yield approach will be a lot more memory efficient and faster too. In other cases, this trick will get you stuck in an infinite loop, even though the original function works just fine. Read on to learn more...</blockquote>\n	2022-01-11 15:37:24.193211	t	4	3
8	<p style="text-align:start;"><span style="color: rgb(249,174,116);background-color: rgb(56,55,69);font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Hi! I want to exchange this website for a Tesla company!</span></p>\n<p style="text-align:start;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: 30px;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Please contact me!</span></p>\n	2022-01-11 15:39:43.975787	f	4	1
10	<p>Hello, this is a test comment for my course work</p>\n	2022-01-13 00:30:39.471196	f	7	4
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, title, user_id, question_id) FROM stdin;
1	User Gipss commented your question: "Greetings".	1	1
2	User Frin0v commented your question: "Remove 'seconds' and 'minutes' from a Pandas dataframe column".	2	2
4	User Frin0v commented your question: "Greetings".	1	1
5	User Elon commented your question: "Remove 'seconds' and 'minutes' from a Pandas dataframe column".	2	2
6	User Elon commented your question: "What does the "yield" keyword do?".	3	3
8	User Elon commented your question: "Greetings".	1	1
9	User Zelenskiy commented your question: "Greetings".	1	1
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, title, content, date_created, views, author_id) FROM stdin;
3	What does the "yield" keyword do?	<p style="text-align:start;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">What is the use of the</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><code>yield</code></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">keyword in Python? What does it do?</span></p>\n<p style="text-align:left;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">For example, I'm trying to understand this code:</span>&nbsp;&nbsp;</p>\n<pre>def _get_child_candidates(self, distance, min_dist, max_dist):<br>    if self._leftchild and distance - max_dist &lt; self._median:<br>        yield self._leftchild<br>    if self._rightchild and distance + max_dist &gt;= self._median:<br>        yield self._rightchild&nbsp;&nbsp;</pre>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">And this is the caller:</span>&nbsp;&nbsp;</p>\n<pre>result, candidates = [], [self]<br>while candidates:<br>    node = candidates.pop()<br>    distance = node._get_dist(obj)<br>    if distance &lt;= max_dist and distance &gt;= min_dist:<br>        result.extend(node._values)<br>    candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))<br>return result</pre>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">What happens when the method</span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><code>_get_child_candidates</code></span> <span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">is called? Is a list returned? A single element? Is it called again? When will subsequent calls stop?</span>&nbsp;</p>\n	2022-01-11 15:06:08.826512	8	3
1	Greetings	<h1><strong>Hello guys</strong>,</h1>\n<p>This is <span style="font-size: 24px;">the first</span> question on this forum.</p>\n<p><code>Don't forget to say hello to other members of the website!</code></p>\n	2022-01-11 14:47:30.949406	19	1
2	Remove 'seconds' and 'minutes' from a Pandas dataframe column	<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Given a dataframe like:</span>&nbsp;&nbsp;</p>\n<pre>import numpy as np<br>import pandas as pd<br><br>df = pd.DataFrame(<br>{'Date' : pd.date_range('1/1/2011', periods=5, freq='3675S'),<br> 'Num' : np.random.rand(5)})<br>                 Date       Num<br>0 2011-01-01 00:00:00       0.580997<br>1 2011-01-01 01:01:15       0.407332<br>2 2011-01-01 02:02:30       0.786035<br>3 2011-01-01 03:03:45       0.821792<br>4 2011-01-01 04:05:00       0.807869</pre>\n<p style="text-align:left;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">I would like to remove the 'minutes' and 'seconds' information.</span></p>\n<p style="text-align:left;"><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The following (mostly stolen from:</span> <a href="https://stackoverflow.com/questions/28664430/how-to-remove-the-seconds-of-pandas-dataframe-index" target="_self"><span style="color: inherit;background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><ins>How to remove the 'seconds' of Pandas dataframe index?</ins></span></a><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">) works okay,</span>&nbsp;</p>\n<pre>df = df.assign(Date = lambda x: pd.to_datetime(x['Date'].dt.strftime('%Y-%m-%d %H')))<br>                 Date       Num<br>0 2011-01-01 00:00:00       0.580997<br>1 2011-01-01 01:00:00       0.407332<br>2 2011-01-01 02:00:00       0.786035<br>3 2011-01-01 03:00:00       0.821792<br>4 2011-01-01 04:00:00       0.807869</pre>\n<p><span style="color: rgb(249,174,116);background-color: transparent;font-size: medium;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">but it feels strange to convert a datetime to a string then back to a datetime. Is there a way to do this more directly?</span></p>\n	2022-01-11 14:58:08.640715	21	2
4	Test question edited	<p>This is <strong>absolutely test question</strong>,</p>\n<pre>edited</pre>\n<p><code>which I made for my course project</code></p>\n	2022-01-13 00:28:22.008397	4	7
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, title) FROM stdin;
1	Admin
2	User
\.


--
-- Data for Name: tag_question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag_question (tag_id, question_id) FROM stdin;
1	1
2	1
3	1
4	2
5	2
6	2
7	2
4	3
8	3
9	3
10	3
11	3
12	4
13	4
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, title) FROM stdin;
1	first
2	greetings
3	start
5	pandas
6	dataframe
7	time-series
8	iterator
9	generator
10	yield
11	coroutine
4	python
12	test
13	edited
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, date_created, profile_image, role_id) FROM stdin;
1	admin	admin@admin.com	$2b$12$lrVSHRzNFNXuAT4osVd8..BEx3L883fj8aQgtjZeXqruwN2C9p/NG	2022-01-11 14:37:06.786965	default.jpg	1
2	Gipss	gissa.dmtr@gmail.com	$2b$12$2IuVTEwcyqtZpOwRjDrQjuBKuPDO1WOq.ksR1Hzi5WzyZltvgkCGy	2022-01-11 14:40:02.809274	https://i.imgur.com/2X9iDvv.jpg	2
3	Frin0v	frin@gmail.com	$2b$12$V2I3WfJpcb0eTiyqOyZBA.Cj5YH6JGT6Z1dXIu3S6c0N9..5LZQ5u	2022-01-11 14:40:22.956874	https://i.imgur.com/KB7XXDf.jpg	2
4	Elon	elonmask@tesla.com	$2b$12$.CG.bDT3nw6jUwlbW0IequA57dZRTuqLprqlBPuGvMoN8hPP/QdJa	2022-01-11 14:41:42.764243	https://i.imgur.com/aEWZSnM.jpg	2
5	Zelenskiy	ukraine@ukr.net	$2b$12$BoGg1FxWYUfHP6vpD1lnDuu/B/hvZWECeQqex5C5rgYp/baTZc9dO	2022-01-11 14:44:30.65827	https://i.imgur.com/FbuBI6C.jpg	2
6	Phone	phone@gmail.com	$2b$12$Iz982LocvYhqj350gUnetOcDYkaroDDOYrzIGJ51QBm/P1PLO3oYO	2022-01-11 16:08:24.540174	default.jpg	2
7	Tester	tester_edited@test.com	$2b$12$StKF.rzirc.anzbepyjD9ex4xeIwtLiFENHu8ISWecbPqy4svEuDe	2022-01-13 00:00:35.502232	https://i.imgur.com/QnGKRBg.jpg	2
\.


--
-- Data for Name: users_dislike_article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_dislike_article (user_id, article_id) FROM stdin;
1	1
2	2
2	5
3	1
3	4
3	5
4	5
5	4
\.


--
-- Data for Name: users_like_article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_like_article (user_id, article_id) FROM stdin;
1	2
1	3
1	4
1	5
2	1
2	3
2	4
3	2
3	3
4	1
4	2
4	3
4	4
5	1
5	2
5	3
5	5
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 6, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 10, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 9, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 4, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: roles roles_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_title_key UNIQUE (title);


--
-- Name: tag_question tag_question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_question
    ADD CONSTRAINT tag_question_pkey PRIMARY KEY (tag_id, question_id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tags tags_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_title_key UNIQUE (title);


--
-- Name: users_dislike_article users_dislike_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_dislike_article
    ADD CONSTRAINT users_dislike_article_pkey PRIMARY KEY (user_id, article_id);


--
-- Name: users_like_article users_like_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_like_article
    ADD CONSTRAINT users_like_article_pkey PRIMARY KEY (user_id, article_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_articles_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_articles_id ON public.articles USING btree (id);


--
-- Name: ix_comments_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_comments_id ON public.comments USING btree (id);


--
-- Name: ix_notifications_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_notifications_id ON public.notifications USING btree (id);


--
-- Name: ix_questions_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_questions_id ON public.questions USING btree (id);


--
-- Name: ix_tag_question_question_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_tag_question_question_id ON public.tag_question USING btree (question_id);


--
-- Name: ix_tag_question_tag_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_tag_question_tag_id ON public.tag_question USING btree (tag_id);


--
-- Name: ix_tags_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_tags_id ON public.tags USING btree (id);


--
-- Name: ix_users_dislike_article_article_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_dislike_article_article_id ON public.users_dislike_article USING btree (article_id);


--
-- Name: ix_users_dislike_article_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_dislike_article_user_id ON public.users_dislike_article USING btree (user_id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_like_article_article_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_like_article_article_id ON public.users_like_article USING btree (article_id);


--
-- Name: ix_users_like_article_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_like_article_user_id ON public.users_like_article USING btree (user_id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: comments comments_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: notifications notifications_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questions questions_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: tag_question tag_question_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_question
    ADD CONSTRAINT tag_question_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: tag_question tag_question_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_question
    ADD CONSTRAINT tag_question_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: users_dislike_article users_dislike_article_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_dislike_article
    ADD CONSTRAINT users_dislike_article_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: users_dislike_article users_dislike_article_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_dislike_article
    ADD CONSTRAINT users_dislike_article_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_like_article users_like_article_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_like_article
    ADD CONSTRAINT users_like_article_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: users_like_article users_like_article_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_like_article
    ADD CONSTRAINT users_like_article_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

